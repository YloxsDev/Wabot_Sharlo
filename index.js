/*

• Base Ori By Irfan
• Created By Christian ID

*/

"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useSingleFileAuthState,
	downloadContentFromMessage,
	jidDecode,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	proto,
	prepareWAMessageMedia,
	delay
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const PhoneNumber = require('awesome-phonenumber')
const { serialize, getBuffer } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const { addAfkUser, checkAfkUser, getAfkReason, getAfkTime, getAfkId, getAfkPosition } = require('./lib/afk');
const _sewa = require("./lib/sewa");

const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./${setting.sessionName}.json`
const { state, saveState } = useSingleFileAuthState(session)

let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));

function title() {
	  console.log(chalk.cyan(figlet.textSync("HARD BOT", {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	})))
	console.log(chalk.yellow(`\n ${chalk.green('[ Created By HARD ]')}\n\n${chalk.white(`[ ${time} ] Database Connect ✓`)}\n${chalk.white(`[ ${time} ] Welcome Back Owner ^-^\n${chalk.white(`[ ${time} ] Server Ready ✓`)}`)}\n`))
}

/**
* Uncache if there is file change;
* @param {string} module Module name or path;
* @param {function} cb <optional> ;
*/
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
/**
* Uncache a module
* @param {string} module Module name or path;
*/
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

const connectToWhatsApp = async () => {
	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            browser: ["By HARD", "Safari", "3.0"]
        })
	title()
        store.bind(conn.ev)
	
	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	
	conn.spam = []
	conn.multi = true
	conn.nopref = false
	conn.prefa = 'anjing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome, _afk, sewa, opengc)
	})
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		
		_sewa.expiredCheck(conn, sewa)
		
		// To Read Presences
        conn.ev.on('presence.update', async data => {
           // Read Data Presences Afk
           if (data.presences) {
             for (let key in data.presences) {
               if (data.presences[key].lastKnownPresence === "composing" || data.presences[key].lastKnownPresence === "recording") {
                 if (checkAfkUser(key, _afk)) {
                   _afk.splice(getAfkPosition(key, _afk), 1)
                   fs.writeFileSync('./database/afk.json', JSON.stringify(_afk, null, 2))
                   conn.sendMessage(data.id, { text: `@${key.split("@")[0]} berhenti afk, dia sedang ${data.presences[key].lastKnownPresence === "composing" ? "mengetik" : "merekam"}`, mentions: [key] })
                 }
               }
             }
           }
        })
        
        setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                conn.groupSettingUpdate(i.id, "not_announcement")
                .then((res) =>
                conn.sendMessage(i.id, { text: `Sukses, group telah dibuka` }))
                .catch((err) =>
                conn.sendMessage(i.id, { text: 'Error' }))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)
        
		conn.ws.on('CB:call', async (json) => {
        const callerId = json.content[0].attrs['call-creator']
        conn.sendMessage(callerId, { text: `Maaf Bot Tidak Menerima Telepon Kamu Akan Diblokir. Silahkan Hubungi Owner Untuk Membuka Blok !` })
        conn.updateBlockStatus(callerId, 'block')
    })
		conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
		conn.getName = (jid, withoutContact = false) => {
        var id = conn.decodeJid(jid)
        withoutContact = conn.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === conn.decodeJid(conn.user.id) ?
            conn.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
		conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
        let list = []
        for (let i of kon) {
            list.push({
                lisplayName: await conn.getName(i + '@s.whatsapp.net'),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i + '@s.whatsapp.net')}\nFN:${await conn.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
           })
        }
        return conn.sendMessage(jid, { contacts: { displayName: `${list.length} Contacts`, contacts: list }, ...opts }, { quoted })
    }
    conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await conn.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }
	
    conn.sendMessageFromContent = async(jid, message, options = {}) => {
        var option = { contextInfo: {}, ...options }
        var prepare = await generateWAMessageFromContent(jid, message, option)
        await conn.relayMessage(jid, prepare.message, { messageId: prepare.key.id })
        return prepare
    }
    conn.reSize = async (image, width, height) => {
       let jimp = require('jimp')
       var oyy = await jimp.read(image);
       var kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
       return kiyomasa
      }
      const reSizee = async(buffer, ukur1, ukur2) => {
             return new Promise(async(resolve, reject) => {
             let jimp = require('jimp')
             var baper = await jimp.read(buffer);
             var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
             resolve(ab)
             })
             }
      
    conn.send5ButLoc = async (jid , text = '' , footer = '', lok, but = [], options = {}) =>{
      let bb = await conn.reSize(lok, 300, 150)
      conn.sendMessage(jid, { location: { jpegThumbnail: bb }, caption: text, footer: footer, buttons: but, ...options })
      }
	conn.ev.on('creds.update', () => saveState)
	
        conn.ev.on('group-participants.update', async (data) => {
    	const metadata = await conn.groupMetadata(data.id)
        const groupName = metadata.subject
        const groupDesc = metadata.desc
        const groupMem = metadata.participants.length
        var but = [{buttonId: `#help`, buttonText: { displayText: "LIST" }, type: 1 }]
            try {
              for (let i of data.participants) {
              	const isWelcome = welcome.includes(data.id) ? true : false
          if (isWelcome) {
                try {
                  var pp_user = await conn.profilePictureUrl(i, 'image')
                } catch {
                  var pp_user = 'https://i.ibb.co/YZdzhGt/522cd54e9767.jpg'
                }
                try {
                        var pp_grup = await conn.profilePictureUrl(data.id, 'image')
                    } catch {
                        var pp_grup = 'https://i.ibb.co/YZdzhGt/522cd54e9767.jpg'
                    }
                    var ppnya = await getBuffer(pp_user)
                    var pp = await reSizee(ppnya, 300, 150)
                if (data.action == "add") {
                  conn.sendMessage(data.id, { viewOnce : true, caption: `Welcome ${i.split("@")[0]} in the group ${groupName}\n\nSilahkan Ketik *.list* untuk melihat Daftar Menu.\n\n*_TERIMAKASIH SUDAH BERGABUNG DI GRUP INI_*`, location: { jpegThumbnail: pp }, templateButtons: but, footer: setting.footer, mentions: [i] })
                } else if (data.action == "remove") {
                  conn.sendMessage(data.id, { viewOnce : true, caption: `Good Bye ${i.split("@")[0]}\n\nSemoga Kamu Bahagia Di Sana`, location: { jpegThumbnail: pp }, templateButtons: but, footer: setting.footer, mentions: [i] })
                }
                }
                }
            } catch (e) {
              console.log(e)
            }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(err => console.log(err))

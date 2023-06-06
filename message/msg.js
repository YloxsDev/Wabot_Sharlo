/*

• Base Ori By Irfan
• Created By Christian ID

*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { isSetProses, addSetProses, removeSetProses, changeSetProses, getTextSetProses } = require('../lib/setproses');
const { isSetDone, addSetDone, removeSetDone, changeSetDone, getTextSetDone } = require('../lib/setdone');
const { addAfkUser, checkAfkUser, getAfkReason, getAfkTime, getAfkId, getAfkPosition } = require('../lib/afk');
const { addRespons, checkRespons, deleteRespons } = require('../lib/respon');
const { webp2mp4File } = require("../lib/convert")
const msgFilter = require("../lib/antispam");
const _sewa = require("../lib/sewa");

const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const imgbb = require("imgbb-uploader");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");
const crypto = require("crypto");
const md5 = require('md5');
const { merchant, secret, signature, digiuser, digiapi } = require("../lib/apikey");
// Exif
const Exif = require("../lib/exif")
const exif = new Exif()
// STALKER
const { stalkff } = require("../lib/stalk-ff");
const { stalkml } = require("../lib/stalk-ml");
// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));
const data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
moment.tz.setDefault("Asia/Jakarta").locale("id");
const PathAuto = "./database/"

module.exports = async(conn, msg, m, setting, store, welcome, _afk, sewa, opengc) => {
	try {
		let { ownerNumber, ownerName, botName, footer } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
        let d = new Date
        let locale = 'id'
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const tanggal = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = fildt.charAt(0).toUpperCase() + fildt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const footernya = setting.footer
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const pushname = msg.pushName
		const isNan = args[1]
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isAntiLink = isGroup ? antilink.includes(from) : false
        const isAntiWame = antiwame.includes(from) ? true : false
        const isWelcome = isGroup ? welcome.includes(from) ? true : false : false
        const isAfkOn = checkAfkUser(sender, _afk)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
		const pp_bot = fs.readFileSync(setting.pathimg)

        const fimage = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "imageMessage": { "title":`${ownerName}`, "h": `Hmm`,'seconds': '359996400', 'caption': `*_✘ BALASAN MENFESS ✘_*`, 'jpegThumbnail': pp_bot}}}
        const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_bot, thumbnail: pp_bot,sendEphemeral: true}}}
		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
		}
		function formatmoney(n, opt = {}) {
		  if (!opt.current) opt.current = "IDR"
		  return "Rp. " + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: pp_bot }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		async function getGcName(groupID) {
            try {
                let data_name = await conn.groupMetadata(groupID)
                return data_name.subject
            } catch (err) {
                return '-'
            }
        }
		
		const buttonsDefault = [
		    { urlButton: { displayText: `My Web`, url : `${setting.link}` } },
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		//Auto Detect Id
		if (isGroup) {
		  const pattern1 = /^(?![°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^])\D*(\d{8,10})\s?\((\d{4,7})\)(\s?\d+)?/;
		  const pattern2 = /^(?![°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^])\D*(\d{11,15})\D*/;
		  const pattern3 = /^(?![°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^])\D*(\d{8,10})\D*/;
		  if (pattern1.test(chats)) {
		    const [_, id, zon] = chats.match(pattern1);
		    stalkml(id, zon).then(u => {
		      if (u.status == 200) {
		        reply(`*🔎 MOBILE LEGENDS 🔍*\n\nID : ${id} (${zon})\nNick : *${u.nickname}*`)
		      }
		      conn.sendMessage(ownerNumber[0], {text:`.mldf ${id}.${zon}`}, {quoted:msg})
		    });
		  } else if (pattern2.test(chats)) {
		    const [_, nomor] = chats.match(pattern2);
		  } else if (pattern3.test(chats)) {
		    const [_, id] = chats.match(pattern3);
		    stalkff(id).then(f => {
		      if (f.status == 200) {
		        reply(`*🔎 FREE FIRE 🔍*\n\nID : ${id}\nNick : *${f.nickname}*`)
		      }
		      conn.sendMessage(ownerNumber[0], {text:`.ffdf ${id}`}, {quoted:msg})
		    });
		  }
		}
		// Store
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                conn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
                    quoted: msg
                })
            } else {
                conn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
                    quoted: msg
                })
            }
        }
		
		// Antispam
        msgFilter.ResetSpam(conn.spam)

		const spampm = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        const spamgr = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            msgFilter.addSpam(sender, conn.spam)
            reply(`Kamu terdeteksi spam bot tanpa jeda, lakukan perintah setelah 5 detik`)
        }
        
        if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
        if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
        if (isCmd && args[0].length > 1 && !isOwner) msgFilter.addFilter(sender)
        
        //Resize
         const reSize = async(buffer, ukur1, ukur2) => {
             return new Promise(async(resolve, reject) => {
             let jimp = require('jimp')
             var baper = await jimp.read(buffer);
             var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
             resolve(ab)
             })
             }
             
             // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.includes(`https://chat.whatsapp.com`)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                conn.sendMessage(from, { delete: msg.key })
                let number = sender
      conn.groupParticipantsUpdate(from, [number], "remove")
            }
        }
        // Anti Wame
        if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(wa.me\/)/gi)) {
                if (!isBotGroupAdmins) return reply(`Untung bot bukan admin`)
                reply(`*「 NOMOR LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link wa.me, maaf kamu akan di kick`)
                conn.sendMessage(from, { delete: msg.key })
                let number = sender
      conn.groupParticipantsUpdate(from, [number], "remove")
            }
        }
             
  //TIME
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')  
 if(time2 < "23:59:00"){
var ucapanWaktu2 = 'Selamat Malam 🌌'
 }
 if(time2 < "19:00:00"){
var ucapanWaktu2 = 'Selamat Sore 🌃'
 }
 if(time2 < "18:00:00"){
var ucapanWaktu2 = 'Selamat Sore 🌅'
 }
 if(time2 < "15:00:00"){
var ucapanWaktu2 = 'Selamat Siang 🏙'
 }
 if(time2 < "11:00:00"){
var ucapanWaktu2 = 'Selamat Pagi 🌄'
 }
 if(time2 < "05:00:00"){
var ucapanWaktu2 = 'Selamat Pagi 🌉'
 } 
 
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}
		
		function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }
        switch (command || triggerSticker()) {
			// Main Menu
			case prefix+'helpmenu':
			case prefix+'help':
			    var teks = allmenu(sender, prefix, pushname, ucapanWaktu2)
			    var but = [{buttonId: `${prefix}owner`, buttonText: { displayText: "Owner" }, type: 1 }]
			    conn.sendMessage(from, { text: teks, mentions: [sender] })
                break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
			case prefix+'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], `${ownerName}`, msg)
			    }
			    break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
				if (isImage || isQuotedImage) {
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
			case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'sticker/'+getRandom('.webp')
                   var rand2 = 'sticker/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                     reply("Tunggu Sebentar...")
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply("Maaf Terjadi Kesalahan")
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply("Tunggu Sebentar...")
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, video: await getBuffer(data.data) }, { quoted: msg })
                     })
                   }
                   break
			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(mess.OnlyOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				break
case prefix+'mysesi':
case prefix+'sendsesi':
case prefix+'session':
case prefix+'sendsession':
if (!isOwner) return reply(mess.OnlyOwner)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
			break
case prefix+'bc': case prefix+'broadcast':
			    if (!isOwner) return reply(mess.OnlyOwner)
			if (!q && !isImage && !isQuotedImage) return reply(`Kirim Gambar Dengan Caption ${command} text\nExample : ${command} Hallo`)
if ( isImage || isQuotedImage ) {
var media = await downloadAndSaveMediaMessage("image", `brotkes.jpeg`)
var data = await store.chats.all()
for (let i of data) {
conn.sendMessage(i.id, { caption: `「 *${botName.toUpperCase()} BROADCAST* 」\n\nTeks : ${q}`, image: fs.readFileSync(`brotkes.jpeg`), mentions: [sender]})
await sleep(1000)
}
reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
} else {
		            if (args.length < 2) return reply(`Kirim Perintah ${command} teks\nContoh : ${command} ${setting.ownerName}`)
                            var data = await store.chats.all()
                            for (let i of data) {
                               conn.sendMessage(i.id, { text: `「 *${botName.toUpperCase()} BROADCAST* 」\n\n${q}`, mentions: [sender]})
                               //conn.send5ButLoc(i.id, `「 _*BROADCAST ${botName.toUpperCase()}*_ 」\n\nTeks : ${q}\n`, footernya, fs.readFileSync(setting.pathimg), buttonBc, {userJid: i.id, mentions: [sender], quoted: msg})
                               await sleep(1000)
                                  }
                               reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
                                  }
                           break
	case prefix+'join':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
				if (!isUrl(args[1])) return reply(mess.error.Iv)
				var url = args[1]
			    url = url.split('https://chat.whatsapp.com/')[1]
				var data = await conn.groupAcceptInvite(url)
				reply(jsonformat(data))
				break
       case prefix+'block':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const block = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "block")
                reply(`Sukses Block Target`)
                break
            case prefix+'unblock':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${command} nomer`)
                const unblock = args.join(" ")
                await conn.updateBlockStatus(args[1] + '@s.whatsapp.net', "unblock")
                reply(`Sukses Unblock Target`)
                break
            case prefix+'leave':
			    if (!isOwner) return reply(mess.OnlyOwner)
				if (!isGroup) return reply(mess.OnlyGrup)
				conn.groupLeave(from)
			    break
case prefix+'setpp': case prefix+'setppbot':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (isImage || isQuotedImage) {
                var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
                if (args[1] == '\'panjang\'') {
                    var { img } = await generateProfilePicture(media)
                    await conn.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type:'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [
                        {
                            tag: 'picture',
                            attrs: { type: 'image' },
                            content: img
                        }
					    ]
                    })
					fs.unlinkSync(media)
					reply(`Sukses`)
				} else {
					var data = await conn.updateProfilePicture(botNumber, { url: media })
			        fs.unlinkSync(media)
				    reply(`Sukses`)
				}
            } else {
                reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
            }
            break
case prefix+'setcmd':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!q) return reply(`Masukan balasannya...\nContoh: ${prefix}setcmd #menu`)
            if (checkRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB) === true) return reply('Key hex tersebut sudah terdaftar di database!')
            addRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), q, sender, responDB)
            reply(`*Key:* ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}\n*Action:* ${q}\n\nBerhasil di set`)
            break
        case prefix+'delcmd':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)) return reply('Key hex tersebut tidak ada di database')
            deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)
            reply(`Berhasil remove key hex ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}`)
            break
case prefix+'addsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Gunakan dengan cara ${command} *link waktu*\n\nContoh : ${command} https://chat.whatsapp.com/Hjv5qt195A2AcwkbswwoMQ 30d`)
            if (!isUrl(args[1])) return reply(mess.error.Iv)
            var url = args[1]
            url = url.split('https://chat.whatsapp.com/')[1]
            if (!args[2]) return reply(`Waktunya?`)
            var data = await conn.groupAcceptInvite(url)
            if (_sewa.checkSewaGroup(data, sewa)) return reply(`Bot sudah disewa oleh grup tersebut!`)
            _sewa.addSewaGroup(data, args[2], sewa)
            reply(`Success Add Sewa Group Berwaktu!`)
            break
        case prefix+'delsewa':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (!isGroup) return reply(`Perintah ini hanya bisa dilakukan di Grup yang menyewa bot`)
            if (!isSewa) return reply(`Bot tidak disewa di Grup ini`)
            sewa.splice(_sewa.getSewaPosition(args[1] ? args[1] : from, sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 2))
            reply(`Sukses`)
            break
       case prefix+'listsewa':
       if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID :* ${x.id}\n`
                if (x.expired === 'PERMANENT') {
                    let ceksewa = 'PERMANENT'
                    list_sewa_list += `*Expire :* PERMANENT\n\n`
                } else {
                    let ceksewa = ms(x.expired - Date.now())
                    list_sewa_list += `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)\n\n`
                }
            }
            conn.sendMessage(from, { text: list_sewa_list }, { quoted: msg })
            break
case prefix+'lista':
			    reply(`*── 「 ${setting.botName} 」 ──*
	
 Dikarnakan Terdapat Bug Button, Untuk Sementara List Kami ganti.

*LIST PRODUK*

 ${prefix}mla
 ${prefix}ffa
`)
			    break
case prefix+'mla':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProducti = "*「 LIST MOBILE LEGEND A 」*\n\nSilahkan Kirimkan Id (zone)\nContoh: 123456789 (2110)\n\n";
data.forEach(function(product) {
  if (product.brand === "MOBILE LEGENDS") {
    if (product.seller_product_status === true) {
      listProducti += `*💎* ${product.buyer_sku_code.replace("ML", "")} Diamond : ${formatmoney(product.price)}\n`;
    } else {
    listProducti += `*❌* ${product.buyer_sku_code.replace("ML", "")} Diamond : _*Gangguan*_\n`;
  }
  }
});
reply(`${listProducti}`);
}
break
case prefix+'mlbs':{
let data = JSON.parse(fs.readFileSync('./database/diamondml.json'));
let listProducti = "*「 LIST MOBILE LEGEND B 」*\n\n";
data.forEach(function(product) {
  if (product.tipe === "mla") {
    let itutuh = `${formatmoney(product.price)}`
  listProducti += `*💎* ${product.name} *:* ${itutuh}\n`;
  } else {
    listProducti += `*❌* _*${product.product_name}*_ \n _Harga : Rp -_ \n _*Status : Produk Sedang Gangguan*_\n`;
  }
});
reply(`${listProducti}`);
}
break
case prefix+'listvilog':{
  reply(' *MOBILE LEGENDS VIA LOGIN*\n*BUY WITH RISK!!*\n\n💎 275  *|* Rp. 55.000\n💎 565  *|* Rp. 105.000\n💎 1155 *|* Rp. 195.000\n💎 1765 *|* Rp. 285.000\n💎 2330 *|* Rp. 380.000\n💎 2975 *|* Rp. 485.000\n💎 4130 *|* Rp. 670.000\n💎 6000 *|* Rp. 930.000\n\n_*RULES* :_\n√ Dimainkan 3-5 match \n√ Bisa Req hero, classic / ranked\n√ Dapat Invoice\n√ Garansi Bila diamond terlambat masuk ke akun\n× Tidak Garansi jika akun terkena pembatasan\n× Dilarang Refund ketika proses kecuali ada kendala.')
}
break
// Store Menu
case prefix+'list': case prefix+'menu':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            let listProducti = `Halo Kak ${pushname}\nSelamat Datang digrup ${groupName}\nUntuk Melihat List Menu Ketikan *teks* dibawah\n\n`;
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    listProducti += `*${x.key}*\n`;
                    }
                }
            var listMsg = {
                text: `${ucapanWaktu} @${sender.split("@")[0]}`,
                buttonText: 'Klik Disini',
                footer: `*List ${groupName}*\n\n⏳ ${jam}\n📆 ${tanggal}`,
                mentions: [sender],
                sections: [{
                    title: groupName, rows: arr_rows
                }]
            }
            conn.sendMessage(from, {text: listProducti})
            break
case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(setting.imgbb, media)
                        addResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses menambahkan list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses menambahkan list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isImage || isQuotedImage) {
                let media = await downloadAndSaveMediaMessage("image", `${pushname}.jpeg`)
                 var njay = await imgbb(setting.imgbb, media)
                        updateResponList(from, args1, args2, true, `${njay.display_url}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
case 'P': case 'p':
if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isQuotedMsg) return reply(`Silakan Reply Pesanannya`)
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jam} WIB\n✨ STATUS : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${quotedMsg.sender.split("@")[0]} sedang di proses!`
            const getTextP = getTextSetProses(from, set_proses)
            if (getTextP !== undefined) {
                mentions(getTextP.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(proses, [quotedMsg.sender], true)
            }
break
case 'd': case 'D':
if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(messAdmin)
            if (!isQuotedMsg) return reply(`Silakan Reply Pesanannya`)
            let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM : ${jam} WIB\n✨ STATUS : Berhasil\`\`\`\n\nTerimakasih @${quotedMsg.sender.split("@")[0]} Next Order Ya 🙏🏻`
            const getTextD = getTextSetDone(from, set_done);
            if (getTextD !== undefined) {
                mentions(getTextD.replace('pesan', quotedMsg.chats).replace('nama', quotedMsg.sender.split("@")[0]).replace('jam', jam).replace('tanggal', tanggal), [quotedMsg.sender], true);
            } else {
                mentions(sukses, [quotedMsg.sender], true)
            }
            break
case prefix+'jeda': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!args[1]) return reply(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
            opengc[from] = { id: from, time: Date.now() + toMS(args[1]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            conn.groupSettingUpdate(from, "announcement")
            .then((res) => reply(`Sukses, group akan dibuka ${args[1]} lagi`))
            .catch((err) => reply('Error'))
            }
            break
// Group Menu
			case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			    if (!isGroup) return reply(mess.OnlyGrup)
				if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				var url = await conn.groupInviteCode(from).catch(() => reply(messErr))
			    url = 'https://chat.whatsapp.com/'+url
				reply(url)
				break
			case prefix+'setppgrup': case prefix+'setppgc':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isImage || isQuotedImage) {
            var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
            if (args[1] == '\'panjang\'') {
            	var { img } = await generateProfilePicture(media)
            	await conn.query({
                    tag: 'iq',
                    attrs: {
                        to: from,
                        type:'set',
                        xmlns: 'w:profile:picture'
                    },
                    content: [
                    {
                        tag: 'picture',
                        attrs: { type: 'image' },
                        content: img
                    } 
                    ]
                })
                fs.unlinkSync(media)
            	reply(`Sukses`)
            } else {
                await conn.updateProfilePicture(from, { url: media })
                .then( res => {
                    reply(`Sukses`)
                    fs.unlinkSync(media)
                }).catch(() => reply(messErr))
            }
            } else {
			    reply(`Kirim/balas gambar dengan caption ${command}`)
            }
            break
			case prefix+'setnamegrup': case prefix+'setnamegc':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateSubject(from, q)
			    .then( res => {
				  reply(`Sukses`)
				}).catch(() => reply(messErr))
			    break
			case prefix+'setdesc': case prefix+'setdescription':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
				await conn.groupUpdateDescription(from, q)
			    .then( res => {
			      reply(`Sukses`)
				}).catch(() => reply(messErr))
				break
			case prefix+'revoke':
			    if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				await conn.groupRevokeInvite(from)
			    .then( res => {
				  reply(`Sukses menyetel tautan undangan grup ini`)
				}).catch(() => reply(messErr))
				break
			case prefix+'hidetag':
		        if (!isGroup) return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			    let mem = [];
		        groupMembers.map( i => mem.push(i.id) )
				conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			    break
case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (groupMembers.length == 1024) return reply(`Anda tidak dapat menambah peserta, karena Grup sudah penuh!`)
            var mems = []
            groupMembers.map( i => mems.push(i.id) )
            var number;
            if (args.length > 1) {
                number = q.replace(/[^0-9]/gi, '')+"@s.whatsapp.net"
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Masukkan nomer yang valid dan terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                var cek = await conn.onWhatsApp(number)
                if (cek.length == 0) return reply(`Peserta tersebut sudah tidak terdaftar di WhatsApp`)
                if (mems.includes(number)) return reply(`Nomer tersebut sudah berada didalam grup!`)
                conn.groupParticipantsUpdate(from, [number], "add")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Kirim perintah ${command} nomer atau balas pesan orang yang ingin dimasukkan`)
            }
            break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            var number;
			if (mentionUser.length !== 0) {
                number = mentionUser[0]
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else if (isQuotedMsg) {
                number = quotedMsg.sender
                conn.groupParticipantsUpdate(from, [number], "remove")
                .then( res => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
            } else {
                reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
            }
            break
        case prefix+'promote': case prefix+'pm':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
                .catch(() => reply(messErr))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
                .catch(() => reply(messErr))
            } else {
                reply(`Tag atau balas pesan member yang ingin dijadikan admin`)
            }
            break
        case prefix+'demote':
            if (!isGroup) return reply(mess.OnlyGrup)
		    if (!isGroupAdmins) return reply(mess.GrupAdmin)
		    if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentionUser.length !== 0) {
                conn.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
                .then( res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
                .catch(() => reply(messErr))
            } else if (isQuotedMsg) {
                conn.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
                .then( res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
                .catch(() => reply(messErr))
            } else {
                reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa`)
            }
            break
         case prefix+'group': case prefix+'grup':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   if (args[1] == "close") {
                     conn.groupSettingUpdate(from, 'announcement')
                     reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
                   } else if (args[1] == "open") {
                     conn.groupSettingUpdate(from, 'not_announcement')
                     reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
                   } else {
                     reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
                   }
                   break
           case prefix+'welcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (args.length === 1) return reply(`Pilih enable atau disable`)
            if (args[1].toLowerCase() === "enable") {
                if (isWelcome) return reply(`Udah aktif`)
                welcome.push(from)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses mengaktifkan welcome di grup ini')
            } else if (args[1].toLowerCase() === "disable") {
                var posi = welcome.indexOf(from)
                welcome.splice(posi, 1)
                fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
                reply('Sukses menonaktifkan welcome di grup ini')
            } else {
                reply(`Pilih enable atau disable`)
            }
            break
          case prefix+'antilinkgc':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                   if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                   if (args.length === 1) return reply(`Pilih enable atau disable`)
                   if (args[1].toLowerCase() === 'enable') {
                     if (isAntiLink) return reply(`Udah aktif`)
                     antilink.push(from)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup aktif')
                   } else if (args[1].toLowerCase() === 'disable') {
                     if (!isAntiLink) return reply(`Udah nonaktif`)
                     let anu = antilink.indexOf(from)
                     antilink.splice(anu, 1)
                     fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
                     reply('Antilink grup nonaktif')
                   } else {
                     reply(`Pilih enable atau disable`)
                   }
                   break
case prefix+'antiwame':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable\nContoh : ${prefix}antiwame enable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiWame) return reply(`Udah aktif`)
                    antiwame.push(from)
					fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
					reply('Sukses mengaktifkan antiwame di grup ini')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antiwame.indexOf(from)
                    antiwame.splice(anu, 1)
                    fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame))
                    reply('Sukses menonaktifkan antiwame di grup ini')
                } else {
                    reply(`Pilih enable atau disable\nContoh : ${prefix}antiwame enable`)
                }
                break
case prefix+'afk':
                   if (!isGroup) return reply(mess.OnlyGrup)
                   if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                   if (body.slice(100)) return reply('Alasanlu kepanjangan')
                   let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                   addAfkUser(sender, Date.now(), reason, _afk)
                   mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
                   break
case prefix+'checksewa': case prefix+'ceksewa':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isSewa) return reply(`Bot tidak di sewa group ini!`)
            let ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            let sewanya = `*Expire :* ${ceksewa.days} day(s) ${ceksewa.hours} hour(s) ${ceksewa.minutes} minute(s) ${ceksewa.seconds} second(s)`
            reply(sewanya)
            break
//Cek Menu
case prefix+'nickff':
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 12345678`)
reply(mess.wait)
var ff = await fetchJson(`https://api.lolhuman.xyz/api/freefire/${args[1]}?apikey=${setting.lolhuman}`)
reply(`*Nickname Berhasil Ditemukan!*\n\nNama : ${ff.result}\nId Game : ${args[1]}`)
break
case prefix+'nickml':
if (args.length < 2) return reply(`Penggunaan ${command} idgame|idserver\n\nContoh : ${command} 84830127|2169`)
if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2\n\nContoh : ${command} 84830127|2169`)
reply(mess.wait)
var ml = await fetchJson(`https://api.lolhuman.xyz/api/mobilelegend/${q.split("|")[0]}/${q.split("|")[1]}?apikey=${setting.lolhuman}`)
reply(`*Nickname Berhasil Ditemukan!*\n\nNama : ${ml.result}\nId Game : ${q.split("|")[0]}\nId Server : ${q.split("|")[1]}`)
break
case prefix+'nickpubg':
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 5119961143`)
reply(mess.wait)
var pubg = await fetchJson(`https://api.lolhuman.xyz/api/pubg/${args[1]}?apikey=${setting.lolhuman}`)
reply(`*Nickname Berhasil Ditemukan!*\n\nNama : ${pubg.result}\nId Game : ${args[1]}`)
break
case prefix+'nickcodm':
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 6290150021186841472`)
reply(mess.wait)
var codm = await fetchJson(`https://api.lolhuman.xyz/api/codm/${args[1]}?apikey=${setting.lolhuman}`)
reply(`*Nickname Berhasil Ditemukan!*\n\nNama : ${codm.result}\nId Game : ${args[1]}`)
break
case prefix+'nickgenshin':
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} 811235076`)
reply(mess.wait)
var genshin = await fetchJson(`https://api.lolhuman.xyz/api/genshin/username/811235076?apikey=${setting.lolhuman}`)
reply(`*Nickname Berhasil Ditemukan!*\n\nNama : ${genshin.result}\nId Game : ${args[1]}`)
break
case prefix+'servermc':
if (args.length < 2) return reply(`Kirim perintah ${command} userid\nContoh : ${command} org.mc-complex.com`)
reply(mess.wait)
var mc = await fetchJson(`https://api.lolhuman.xyz/api/minecraft/${args[1]}?apikey=${setting.lolhuman}`)
reply(`*Server Berhasil Ditemukan!*\n\nVersi : ${mc.result.version}\nPlayer Online : ${mc.result.players.online}\nPlayer Max : ${mc.result.players.max}\nLatency : ${mc.result.latency}\nServer : ${args[1]}`)
break
case prefix+'koneksi':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
const sections = [
  {
	rows: [
	    {title: "SMILE ONE", rowId: `${prefix}soc`},
	    
	    {title: "DIGIFLAZZ", rowId: `${prefix}saldo`}]},
]
let isian = `    
Silahkan Pilih Provider Yang Akan Dicek`
const listMessage = {
  text: isian,
  footer: `${footernya}`,
  title: `*「 CEK SERVER PROVIDER 」*`,
  buttonText: "Klik Disini",
  sections
}
const tessgh = await conn.sendMessage(from, listMessage)
break
case prefix+'saldo':{
if (!isOwner) return reply(mess.OnlyOwner)
const crypto = require("crypto")
const axios = require("axios")
let first = digiuser
let second = digiapi
let third = 'depo';
console.log(first)
let hash = crypto.createHash('md5')
  .update(first + second + third)
  .digest('hex');

var config = {
  method: 'POST',  // Set the HTTP method to POST
  url: 'https://api.digiflazz.com/v1/cek-saldo',  // Set the target URL
  data: {
    "cmd": "deposit",
    "username": first,
    "sign": hash
}
};

axios(config)
  .then(function (response) {
    if (response.data.data){
    reply(`*── 「 SALDO AKUN 」 ──*

*STATUS :* TERHUBUNG
*SALDO SERVER :* ${formatmoney(response.data.data.deposit)}`)
  } else {
  reply(`*── 「 SALDO AKUN 」 ──*\n
*_Server Terputus Mohon Untuk Mengecek Providernya Kembali_*.\n`)
}
  })
}
break
case prefix+'soc':{
if (!isOwner) return reply(mess.OnlyOwner)
const axios = require('axios')

var config = {
  method: 'get',
  url: `https://v1.apigames.id/merchant/${merchant}/cek-koneksi?engine=smileone&signature=${signature}`,
  headers: { }
};

axios(config)
.then(function (response) {
if (response.data.message == "Data Found"){
reply(`*── 「 SMILEONE AKUN 」 ──*

_Silahkan Cek Data Berikut Ini:_
_》STATUS SERVER : *TERHUBUNG*_
_》SALDO SERVER : *${response.data.data.data.balance} SOC*_`)
} else {
reply(`*── 「 AKUN SMILEONE 」 ──*

*_Server Terputus Mohon Untuk Mengecek Providernya Kembali_*.\n`)
}
})
}
break
case prefix+'updatedigi':{
if (!isOwner) return reply(mess.OnlyOwner)
var jual = q.split(".")[0]
if (!jual) return reply('Format salah, Silahkan Ketikan *_.updatedigi 10*\n Format Diatas Adalah .getdigi 10(yaitu keuntungan 10%)_')
const crypto = require("crypto")
let code = 'pricelist';

let hasho = crypto.createHash('md5')
  .update(digiuser + digiapi + code)
  .digest('hex');

var config = {
  method: 'POST',  // Set the HTTP method to POST
  url: 'https://api.digiflazz.com/v1/price-list',  // Set the target URL
  data: {
    "cmd": "prepaid",
    "username": digiuser,
    "sign": hasho
}
};

axios(config)
  .then(function (response) {
    let data = JSON.stringify(response.data.data);
    // Simpan data ke file
    fs.writeFileSync('./datadigiflaz.json', data);
    let dataup = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
    let persentase = `${jual}`;
    dataup.forEach(i => i.price += i.price * (persentase / 100));
    let updatedData = JSON.stringify(dataup);
    fs.writeFileSync('./datadigiflaz.json', updatedData);
    reply(`Produk *Digiflazz* Berhasil Di Update Dengan Profit ${jual}℅`)
  })

  .catch(error => {
    reply("Gagal");
  });
}
break
case prefix+'cekproduk':
const seleksi = [
  {
title: "Fitur Topup Digital",
	rows: [
	    {title: "List Diamond Free Fire", rowId: `${prefix}listffdf`},
	    
	    {title: "List Diamond Mobile Legends A", rowId: `${prefix}listmldf`},

	    {title: "List Diamond Mobile Legends B", rowId: `${prefix}listmlag`},
	    
	    {title: "UC PUBG", rowId: `${prefix}listpubg`},
	    
	    {title: "List Genshin Impact", rowId: `${prefix}listgenshin`},
	    
	    {title: "E-Wallet Dana", rowId: `${prefix}listdana`},
	    ]
  },
]
var isianya = `_Berikut Adalah Data Akun Anda:_\n_》Name : *${pushname}*_\n_》Id : ${sender.replace("@s.whatsapp.net", "")}_

Silahkan Pilih Produk Dibawah`
var listMessagee = {
  text: isianya,
  footer: `${footernya}`,
  title: `*「 PRODUK ${footernya} 」*`,
  buttonText: "Klik Disini",
  sections: seleksi
}
const tess = await conn.sendMessage(from, listMessagee)
break
case prefix+'ip':
if (!isOwner) return reply(mess.OnlyOwner)
      reply(mess.wait)
      const dripsba = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        qs: {apikey: '873dbe322aea47f89dcf729dcc8f60e8'},
        headers: {
          'X-RapidAPI-Key': '837661b454msh274b6753ca80823p11c653jsn973bb2a55a34',
          'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
          useQueryString: true
        }
      };
      let bhudhi = require('request')
      bhudhi(dripsba, function (error, response, body) {
        if (error) throw new Error(error);
        reply(body);
        console.log(body);
      });
break
case prefix+'ml':{
if (!isOwner) return reply(mess.OnlyOwner)
let id = q.split(".")[0]
let zon = q.split(".")[1]
let proddf = q.split(".")[2]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
if (!proddf) return reply('Masukan Jumlah Diamond')

const short = require('short-uuid');
let isian = `${id}${zon}`
if(fs.existsSync(`./database/${isian}.json`)){ return reply(`Agar Tidak Terjadi Trx Dobel pada ID ${isian} Silahkan Menunggu 20 Detik`)
} else {
  var deposit_ml = {
      ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
      session: "topup",
      akun: `${isian}`,
    }
    fs.writeFileSync(PathAuto + `${isian}` + ".json", JSON.stringify(deposit_ml, null, 2));
      
      stalkml(id, zon).then(u => {
        if (u.status !== 200) {
          reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
        } else if (u.status == 200) {
          
          let referdf = short.generate()
          let dm = `ML${proddf}`
          //  signature
          const signature = crypto.createHash('md5')
          .update(digiuser + digiapi + referdf)
          .digest('hex');
          
          //  transaction
          var config = {
            method: 'POST',
            url: 'https://api.digiflazz.com/v1/transaction',
            data: {
              "username": digiuser,
              "buyer_sku_code": dm,
              "customer_no": isian,
              "ref_id": referdf,
              "sign": signature
            }
          };
          
          axios(config)
          .then(async res => {
            reply(`*「 Transaksi Pending 」*\n\n_Please Wait 40 Seconds_`)
            let status = res.data.data.status;
            const refId = res.data.data.ref_id;
            console.log(status)
            while (status !== 'Sukses') {
              await sleep(3000); // wait for 5 seconds
              const response = await axios(config);
              status = response.data.data.status;
              console.log(status)
              if (status == "Gagal") {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
              break;
              fs.unlinkSync(`./database/${isian}.json`)
              } else if (status == "Sukses") {
                reply(`*「 success. BOSSKU 」*\n\n*›› Item :* ${proddf} Diamond (MLBB)\n*›› ID Game :* ${id} (${zon})\n*›› Username :* *${u.nickname}*\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n*›› Ref Id :* ${refId}\n\n*BOT TOPUP OTOMATIS*`)
                break;
                fs.unlinkSync(`./database/${isian}.json`)
              }
            }
          })
          .catch(error => {
            if (error.response) {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
              fs.unlinkSync(`./database/${isian}.json`)
            } else {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Silahkan cek Produk Provider Anda lagi*`);
            conn.sendMessage(ownerNumber[0], {text:`Terjadi kendala pada server, Silahkan cek Pada Console Browser Anda`}, {quoted:msg})
            fs.unlinkSync(`./database/${isian}.json`)
            }
          });
        }
      })
}
}
break
case prefix+'ff':{
if (!isOwner) return reply(mess.OnlyOwner)
let id = q.split(".")[0]
let prod = q.split(".")[1]
if (!id) return reply('ID wajib di isi')
if (!prod) return reply('Masukan Jumlah Diamond')

const short = require('short-uuid');
const axios = require('axios')
const crypto = require('crypto')

let isian = `${id}`

if(fs.existsSync(`./database/${isian}ff.json`)){ return reply(`Agar Tidak Terjadi Trx Dobel pada ID ${isian} Silahkan Menunggu, Atau Periksa Provider Anda`)
} else {
  var deposit_ml = {
      ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
      session: "topup",
      akun: `${isian}ff`,
    }
    fs.writeFileSync(PathAuto + `${isian}ff` + ".json", JSON.stringify(deposit_ml, null, 2));
    
    let referdf = short.generate()
    let dm = `F${prod}`
    
    stalkff(id).then(u => {
      if (u.status !== 200) {
        reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
      } else if (u.status == 200) {
        
        const signature = crypto.createHash('md5')
        .update(digiuser + digiapi + referdf)
        .digest('hex');
        
    var config = {
          method: 'POST',
          url: 'https://api.digiflazz.com/v1/transaction',
          data: {
            "username": digiuser,
            "buyer_sku_code": dm,
            "customer_no": isian,
            "ref_id": referdf,
            "sign": signature
          }
        };
        
        axios(config)
        .then(async res => {
          reply(`*「 Transaksi Pending 」*\n\n_Please Wait 40 Seconds_`)
          let status = res.data.data.status;
          const refId = res.data.data.ref_id;
          while (status !== 'Sukses') {
            await sleep(3000); // wait for 5 seconds
          const response = await axios(config);
          status = response.data.data.status;
          if (status == "Gagal") {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
              break;
              fs.unlinkSync(`./database/${isian}ff.json`)
            } else if (status == "Sukses") {
              reply(`*「 success. BOSSKU 」*\n\n*›› Status :* ${status}\n*›› Item :* ${prod} Diamond (FF)\n*›› ID Game :* ${id}\n*›› Username :* *${u.nickname}*\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n*›› Ref Id :* ${refId}\n\n*BOT TOPUP OTOMATIS*`)
              break;
              fs.unlinkSync(`./database/${isian}ff.json`)
            }
          }
        })
        
        .catch(error => {
          if (error.response) {
            reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
            conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
            fs.unlinkSync(`./database/${isian}ff.json`)
          } else {
            reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Silahkan cek Produk Provider Anda lagi*`);
            conn.sendMessage(ownerNumber[0], {text:`Terjadi kendala pada server, Silahkan cek Pada Console Browser Anda`}, {quoted:msg})
            fs.unlinkSync(`./database/${isian}ff.json`)
          }
        });
      }
    });
}
}
break
case prefix+'ffa':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProduct = "*「 LIST DIAMOND FREE FIRE 」*\n\nSilahkan Kirimkan ID FF Kalian\nContoh: 123456789 720 Diamond\n\n";
data.forEach(function(product) {
  if (product.brand === "FREE FIRE") {
if (product.seller_product_status === true) {
  listProduct += `*💎* ${product.buyer_sku_code.replace("F", "")} Diamond : ${formatmoney(product.price)}\n`;
    } else {
    listProduct += `*❌* ${product.buyer_sku_code.replace("F", "")} Diamond : _*Gangguan*_\n`;
  }
  }
});
reply(`${listProduct}`);
}
break
case prefix+'listffdf':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProduct = "*「 LIST DIAMOND FREE FIRE 」*\n\nSilahkan Kirimkan ID FF Kalian\nContoh: 123456789 500 Diamond\n\n";
data.forEach(function(product) {
  if (product.brand === "FREE FIRE") {
if (product.seller_product_status === true) {
  listProduct += `*💎* _*${product.product_name}*_ \n _*Harga : ${formatmoney(product.price)}*_ \n _*Status : Tersedia*_\n\n`;
  } else {
    listProduct += `*❌* _*${product.product_name}*_ \n _Harga : Rp -_ \n _*Status : Produk Sedang Gangguan*_\n\n`;
  }
  }
});
reply(`${listProduct}`);
}
break
case prefix+'listmldf':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProducti = "*「 LIST MOBILE LEGEND A 」*\n\n_*Silahkan Kirimkan Id (zone)\nContoh: 123456789 (2110)\n\n";
data.forEach(function(product) {
  if (product.brand === "MOBILE LEGENDS") {
if (product.seller_product_status === true) {
  listProducti += `*💎* _*${product.product_name}*_ \n _*Harga : ${formatmoney(product.price)}*_\n\n`;
  } else {
    listProducti += `*❌* _*${product.product_name}*_ \n _*Status : Produk Sedang Gangguan*_\n\n`;
  }
  }
});
reply(`${listProducti}`);
}
break
case prefix+'listmlag':{
let data = JSON.parse(fs.readFileSync('./database/diamondml.json'));
let listProducti = "*「 LIST MOBILE LEGEND B 」*\n\n";
data.forEach(function(product) {
  if (product.tipe === "mla") {
    let itutuh = `${formatmoney(product.price)}`
  listProducti += `*💎* ${product.name} *:* ${itutuh}\n`;
  } else {
    listProducti += `*❌* _*${product.product_name}*_ \n _Harga : Rp -_ \n _*Status : Produk Sedang Gangguan*_\n`;
  }
});
reply(`${listProducti}`);
}
break
case prefix+'listvilog':{
  reply(' *MOBILE LEGENDS VIA LOGIN*\n*BUY WITH RISK!!*\n\n💎 275  *|* Rp. 55.000\n💎 565  *|* Rp. 105.000\n💎 1155 *|* Rp. 195.000\n💎 1765 *|* Rp. 285.000\n💎 2330 *|* Rp. 380.000\n💎 2975 *|* Rp. 485.000\n💎 4130 *|* Rp. 670.000\n💎 6000 *|* Rp. 930.000\n\n_*RULES* :_\n√ Dimainkan 3-5 match \n√ Bisa Req hero, classic / ranked\n√ Dapat Invoice\n√ Garansi Bila diamond terlambat masuk ke akun\n× Tidak Garansi jika akun terkena pembatasan\n× Dilarang Refund ketika proses kecuali ada kendala.')
}
break
case prefix+'mlag':{
if (!isOwner) return reply(mess.OnlyOwner)
let id = q.split(".")[0]
let zon = q.split(".")[1]
let prod = q.split(".")[2]
if (!id) return reply('ID wajib di isi')
if (!zon) return reply('ZoneID wajib di isi')
if (!prod) return reply('Masukan Jumlah Diamond')

const short = require('short-uuid');
const axios = require('axios')
const crypto = require('crypto')

stalkml(id, zon).then(u => {
  if (u.status !== 200) {
    reply('Terjadi Kesalahan!!\nid/zone tidak ditemukan')
  } else if (u.status == 200) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let referag = short.generate()
    let produk = `ML${prod}`
    
    var hash = md5(`${merchant}:${secret}:${referag}`)
    
    const configTransaksi = {
      method: 'POST',
      url: 'https://v1.apigames.id/v2/transaksi',
      data: {
        "ref_id": referag,
        "merchant_id": merchant,
        "produk": produk,
        "tujuan": id,
        "server_id": zon,
        "signature": hash
      }
    };
    
    const configCekStatus = {
      method: 'POST',
      url: 'https://v1.apigames.id/v2/transaksi/status',
      data: {
        "ref_id": referag,
        "merchant_id": merchant,
        "signature": hash
      }
    };
    
    axios(configTransaksi)
    .then(async res => {
      console.log(res)
      let status = res.data.data.status;
      const refId = res.data.data.ref_id;
      // While loop untuk mengecek status transaksi
    while (status !== 'Sukses') {
      await sleep(1000); // Tunggu 1 detik
      
      // Request cek status transaksi
      const response = await axios(configCekStatus);
      status = response.data.data.status;
      if (status == "Validasi Provider") {
        reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
        conn.sendMessage(ownerNumber[0], {text:`Status : *${response.data.data.status}*\n\nDetail Error code : https://docs.apigames.id/docs/v2/pendahuluan`}, {quoted:msg})
        break;
      } else if (status == "Sukses Sebagian") {
        reply(`*「 TOPUP SUKSES SEBAGIAN 」*\n\n*Transaksi Masuk Sebagian Silahkan Cek Diprovider Anda*`)
        conn.sendMessage(ownerNumber[0], {text:`Status : *${response.data.data.status}*\n\nDetail Error code : https://docs.apigames.id/docs/v2/pendahuluan`}, {quoted:msg})
        break;
      } else if (status == "Gagal") {
        reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
        conn.sendMessage(ownerNumber[0], {text:`Status : *${response.data.data.status}*\n\nDetail Error code : https://docs.apigames.id/docs/v2/pendahuluan`}, {quoted:msg})
        break;
      } else if (status == "Sukses") {
        reply(`*「 success. BOSKU 」*\n\n*›› Item :* ${prod} Diamond (MLBB)\n*›› ID Game :* ${id} (${zon})\n*›› Username :* *${u.nickname}*\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n*›› Ref Id :* ${refId}\n\n*BOT TOPUP OTOMATIS*`)
        break;
      }
    }
    })
    .catch(error => {
      console.log(error)
          if (error.response) {
            reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
            conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
          } else {
            reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
            conn.sendMessage(ownerNumber[0], {text:`Error Tidak diketahui\nSilahkan Mengecek Pada Console Browser Anda`}, {quoted:msg})
          }
        });
  }
})
}
break
case prefix+'listdana':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProducti = "*「 LIST E-WALLET DANA 」*\n\n";
data.forEach(function(product) {
  if (product.brand === "DANA") {
if (product.seller_product_status === true) {
  listProducti += `*💵* _*${product.product_name}*_ \n _*Harga : ${formatmoney(product.price)}*_\n\n`;
  } else {
    listProducti += `*❌* _*${product.product_name}*_ \n _*Status : Gangguan*_\n\n`;
  }
  }
});
reply(`${listProducti}`);
}
case prefix+'dana':{
if (!isOwner) return reply(mess.OnlyOwner)
let nomor = q.split(".")[0]
let isi = q.split(".")[1]
if (!nomor) return reply('Nomor wajib di isi\nContoh: .dana 0822xxx.10')
if (!isi) return reply('Isi wajib di isi\nContoh: .dana 0822xxx.10')

const short = require('short-uuid');

let referdf = short.generate()
let isian = `${nomor}`
let dm = `DANA${isi}`

      //  signature
const signature = crypto.createHash('md5')
.update(digiuser + digiapi + referdf)
.digest('hex');

    //  transaction
var config = {
      method: 'POST',
      url: 'https://api.digiflazz.com/v1/transaction',
      data: {
        "username": digiuser,
        "buyer_sku_code": dm,
        "customer_no": isian,
        "ref_id": referdf,
        "sign": signature
      }
    };
    axios(config)
    .then(async res => {
      reply(`*「 Transaksi Pending 」*\n\n_Please Wait 40 Seconds_`)
      let status = res.data.data.status;
      const refId = res.data.data.ref_id;
      
      while (status !== 'Sukses') {
        await sleep(1000); // wait for 5 seconds
        const response = await axios(config);
        status = response.data.data.status;
        if (status == "Gagal") {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
              break;
            } else if (status == "Sukses") {
              reply(`*「 success. BOSSKU 」*\n\n*›› Item :* ${isi}.000 Dana\n*›› Nomor :* ${nomor}\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n*›› Ref Id :* ${refId}\n\n*BOT TOPUP OTOMATIS*`)
              break;
            }
      }
    })
    .catch(error => {
      if (error.response) {
        reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
        conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
        } else {
          console.error('Error occurred while sending request');
        }
    });
}
break
case prefix+'listpubg':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProducti = "*「 LIST PUBG MOBILE 」*\n\nSilahkan Kirimkan Id (zone)\nContoh: 123456789\n\n";
data.forEach(function(product) {
  if (product.brand === "PUBG MOBILE") {
    if (product.seller_product_status === true) {
      listProducti += `*💸* ${product.buyer_sku_code.replace("PUBG", "")} UC : ${formatmoney(product.price)}\n`;
    } else {
    listProducti += `*❌* ${product.buyer_sku_code.replace("Pubg", "")} UC : _*Gangguan*_\n`;
  }
  }
});
reply(`${listProducti}`);
}
break
case prefix+'pubg':{
if (!isOwner) return reply(mess.OnlyOwner)
let id = q.split(".")[0]
let proddf = q.split(".")[1]
if (!id) return reply('ID wajib di isi')
if (!proddf) return reply('Masukan Jumlah Diamond')
const short = require('short-uuid');

let isian = `${id}`
let referdf = short.generate()
let dm = `PUBG${proddf}`
    
    //  signature
    const signature = crypto.createHash('md5')
    .update(digiuser + digiapi + referdf)
    .digest('hex');
    
    //  transaction
    var config = {
      method: 'POST',
      url: 'https://api.digiflazz.com/v1/transaction',
      data: {
        "username": digiuser,
        "buyer_sku_code": dm,
        "customer_no": isian,
        "ref_id": referdf,
        "sign": signature
      }
    };
    
    axios(config)
    .then(async res => {
      reply(`*「 Transaksi Pending 」*\n\n_Please Wait 40 Seconds_`)
            console.log(res.data)
            let status = res.data.data.status;
            const refId = res.data.data.ref_id;
            console.log(status)
            while (status !== 'Sukses') {
              await sleep(3000); // wait for 5 seconds
              const response = await axios(config);
              status = response.data.data.status;
              console.log(status)
              if (status == "Gagal") {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
              break;
              } else if (status == "Sukses") {
              reply(`*「 success. BOSSKU 」*\n\n*›› Item :* ${proddf} UC (PUBGM)\n*›› ID Game :* ${id}\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n*›› Ref Id :* ${refId}\n*›› Sn :* ${response.data.data.sn}\n\n*BOT TOPUP OTOMATIS*`)
              break;
              }
            }
          })
          .catch(error => {
            if (error.response) {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
              conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
            } else {
              reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Silahkan cek Produk Provider Anda lagi*`);
              conn.sendMessage(ownerNumber[0], {text:`Terjadi kendala pada server, Silahkan cek Pada Console Browser Anda`}, {quoted:msg})
            }
          });
}
break
case prefix+'listgenshin':{
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));
let listProduct = "*「 LIST DIAMOND GENSHIN IMPACT 」*\n\n";
data.forEach(function(product) {
  if (product.brand === "Genshin Impact") {
if (product.seller_product_status === true) {
  listProduct += `*💎* ${product.product_name.replace("Genshin Impact", "")} : ${formatmoney(product.price)}\n`;
    } else {
    listProduct += `*❌* ${product.product_name.replace("Genshin Impact", "")} : _*Gangguan*_\n`;
  }
  }
});
reply(`${listProduct}`);
}
break
case prefix+'gi':{
if (!isOwner) return reply(mess.OnlyOwner)
let id = q.split(".")[0]
let prod = q.split(".")[1]
if (!id) return reply('ID wajib di isi\nContoh: .gi 123456789.100')
if (!prod) return reply('Masukan Jumlah Diamond\nContoh: .gi 123456789.100')
const short = require('short-uuid');
let data = JSON.parse(fs.readFileSync('./datadigiflaz.json'));

let referdf = short.generate()
let isian = `${id}`
let dm = `GS${prod}`

const signature = crypto.createHash('md5')
.update(digiuser + digiapi + referdf)
.digest('hex');

data.forEach(function(gs) {
  if (gs.buyer_sku_code === `${dm}`) {
var config = {
  method: 'POST',
  url: 'https://api.digiflazz.com/v1/transaction',
  data: {
    "username": digiuser,
    "buyer_sku_code": dm,
    "customer_no": isian,
    "ref_id": referdf,
    "sign": signature
  }
};

axios(config)
.then(async res => {
  reply(`*「 Transaksi Pending 」*\n\n_Please Wait 40 Seconds_`)
  console.log(res.data)
  let status = res.data.data.status;
  const refId = res.data.data.ref_id;
  while (status !== 'Sukses') {
    await sleep(3000); // wait for 5 seconds
    const response = await axios(config);
    console.log(response.data)
    status = response.data.data.status;
    if (status == "Gagal") {
      reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`)
      conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
      break;
    } else if (status == "Sukses")
    {
      reply(`*「 success. BOSSKU 」*\n\n*›› Item :* ${gs.product_name}\n*›› ID Game :* ${id}\n*›› Ref Id :* ${refId}\n*›› Sn :* ${response.data.data.sn}\n*›› Tanggal :* ${tanggal}\n*›› Jam :* ${jam}\n\n*BOT TOPUP OTOMATIS*`)
      break;
    } 
  }
})

.catch(error => {
  if (error.response) {
    reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
    conn.sendMessage(ownerNumber[0], {text:`ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/`}, {quoted:msg})
  } else {
    reply(`*「 TOPUP GAGAL 」*\n\n*Transaksi Gagal Silahkan cek Produk Provider Anda lagi*`);
    conn.sendMessage(ownerNumber[0], {text:`Terjadi kendala pada server, Silahkan cek Pada History trx Provider *Sukses* Atau *Gagal*`}, {quoted:msg})
  }
});
}
})
}
break
			default:
			if (!isGroup && isCmd) {
				reply(`Command belum tersedia, coba beberapa hari kedepan yaa! _^`)
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}

import { exec } from "child_process"

// IMAGEN STRAWBERRY
const STRAWBERRY_IMG = 'https://files.evogb.win/iWTUtX.jpg'

let handler = async (m, { conn, command }) => {
    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    const owner = "@573215829404"
    const targetNumber = "573215829404@s.whatsapp.net" // +57 321 5829404 Andreitap'
    const img = { url: STRAWBERRY_IMG }

    // 1. RESET
    if (command === 'reset') {
        await react('🔄')
        let msg = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***REINICIO*** 𐔌 ꒱ 🔄

.⃟𖥔 ݁. 𖦹˙— \`\`REINICIO\`\` —˙𖦹.🔄꒷

── *📊 ESTADO* ╏
🔄 ➛ Reiniciando sistema pe
⏳ ➛ Por favor espera unos segundos

── *📝 NOTA* ╏
⚡ ➛ El bot se reiniciará automáticamente 🍓

━━━━━━━━━━━`

        await conn.sendMessage(m.chat, {
            image: img,
            caption: msg
        }, { quoted: m })

        process.send('reset')
    }

    // 2. AUTOADMIN - AHORA TU NUMERO
    if (command === 'autoadmin') {
        try {
            await react('👑')
            await conn.groupParticipantsUpdate(m.chat, [targetNumber], 'promote')
            let msg = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ADMIN ASIGNADO*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`ADMIN\`\` —˙𖦹.👑꒷

── *📊 ESTADO* ╏
👑 ➛ Administrador asignado pe
📱 ➛ Número: +57 321 5829404 - Andreitap'
✅ ➛ Ya tiene permisos de admin

── *📝 NOTA* ╏
🔒 ➛ Ahora puede gestionar el grupo 🍓

━━━━━━━━━━━`
            await conn.sendMessage(m.chat, {
                image: img,
                caption: msg,
                mentions: [targetNumber]
            }, { quoted: m })
        } catch (e) {
            await react('❌')
            let error = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ERROR*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ No se pudo asignar admin a +57 321 5829404 pe
⚠️ ➛ Revisa que no sea admin o tengas permisos

━━━━━━━━━━━`
            conn.sendMessage(m.chat, {
                image: img,
                caption: error
            }, { quoted: m })
        }
    }

    // 3. UPDATE / ACTUALIZAR / FIX
    if (command === 'update' || command === 'actualizar' || command === 'fix') {
        await react('🌀')

        let loading = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ACTUALIZANDO*** 𐔌 ꒱ 🌀

.⃟𖥔 ݁. 𖦹˙— \`\`ACTUALIZANDO\`\` —˙𖦹.🌀꒷

── *📊 ESTADO* ╏
🌀 ➛ Obteniendo cambios del repositorio pe
⏳ ➛ Por favor espera

━━━━━━━━━━━`

        await conn.sendMessage(m.chat, {
            image: img,
            caption: loading
        }, { quoted: m })

        exec('git pull', async (err, stdout, stderr) => {
            if (err) {
                await react('❌')
                let errorMsg = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ERROR*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ Error en la actualización pe

── *📊 DETALLE* ╏
\`\`${err.message}\`\`

── *👑 OWNER* ╏
${owner} - Andreitap'

━━━━━━━━━━━`
                return conn.sendMessage(m.chat, {
                    image: img,
                    caption: errorMsg,
                    mentions: [owner.replace('@','') + '@s.whatsapp.net']
                }, { quoted: m })
            }

            if (stdout.includes('Already up to date.')) {
                await react('✅')
                let upToDate = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ACTUALIZADO*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`ACTUALIZADO\`\` —˙𖦹.✅꒷

── *📊 ESTADO* ╏
✅ ➛ Sistema actualizado pe
💎 ➛ Ya estás en la versión más reciente 🍓

── *👑 OWNER* ╏
${owner} - Andreitap'

━━━━━━━━━━━`
                return conn.sendMessage(m.chat, {
                    image: img,
                    caption: upToDate,
                    mentions: [owner.replace('@','') + '@s.whatsapp.net']
                }, { quoted: m })
            }

            await react('✅')
            let updateMsg = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ACTUALIZACIÓN*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`ACTUALIZACIÓN\`\` —˙𖦹.📥꒷

── *📊 ESTADO* ╏
📥 ➛ Actualización aplicada pe

── *📋 CAMBIOS* ╏
\`\`${stdout}\`\`

── *👑 OWNER* ╏
${owner} - Andreitap'

━━━━━━━━━━━`
            return conn.sendMessage(m.chat, {
                image: img,
                caption: updateMsg,
                mentions: [owner.replace('@','') + '@s.whatsapp.net']
            }, { quoted: m })
        })
    }
}

handler.help = ['reset', 'autoadmin', 'update']
handler.tags = ['owner']
handler.command = ['reset', 'autoadmin', 'update', 'actualizar', 'fix']
handler.rowner = true

export default handler
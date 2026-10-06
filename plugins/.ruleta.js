let handler = async (m, { conn }) => {
    let groupMetadata = await conn.groupMetadata(m.chat)
    let participants = groupMetadata.participants
    let botNumber = conn.user.jid

    let candidates = participants.filter(p => !p.admin && p.id !== botNumber)
    if (!candidates.length) return m.reply(`‧˚꒰🍓୭ *_𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓_*\n\n꒰🩷꒱ No victims, all admins`)

    let victim = candidates[Math.floor(Math.random() * candidates.length)]

    await conn.sendMessage(m.chat, { 
        text: 
`‧˚꒰🍓୭ *_𝐑 𝐔 𝐋 𝐄 𝐓 𝐀 𝐁 𝐀 𝐍_*
*𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓 🍓*

╭───SPINNING ꒰🍓꒱────╮
‧˚꒰🩷୭ Choosing victim...
‧˚꒰🍰୭ Participants: ${candidates.length}
╰─────── ݁ ˖Ი𐑼⋆────╯

꒰🍓꒱ Roulette chose @${victim.id.split('@')[0]} 💥

*¡STRAWBERRY MADE YOU JAM!* 🍓`,
        mentions: [victim.id]
    })

    await new Promise(r => setTimeout(r, 1500))

    try {
        await conn.groupParticipantsUpdate(m.chat, [victim.id], 'remove')
        await conn.sendMessage(m.chat, { react: { text: '🍓', key: m.key } })
    } catch (e) {
        m.reply(`‧˚꒰🍓୭ *_𝐒𝐓𝐑𝐀𝐖𝐁𝐄𝐑𝐑𝐘 𝐁𝐎𝐓_*\n\n꒰🩷꒱ I couldn't kick @${victim.id.split('@')[0]}`, null, { mentions: [victim.id] })
    }
}

handler.help = ['ruletaban']
handler.tags = ['group']
handler.command = /^(ruletaban|ruletab)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
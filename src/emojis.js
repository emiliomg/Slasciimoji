'use strict';

const emojis = {
	"shrug": "¯\\_(ツ)_/¯",
	"fu": "╭∩╮(︶︿︶)╭∩╮",
	"eyes": "ಠ_ಠ",
	"zoidberg": "(\\/)(°,,,°)(\\/)",
	"sunglasses": "(⌐■_■)",
	"y u no": "ლ(ಠ益ಠლ)",
	"cry": "(ಥ﹏ಥ)"
	"do it": "(☞ﾟヮﾟ)☞",
	"teddy": "ʕ•ᴥ•ʔ",
	"flip": "(╯°□°）╯︵ ┻━┻",
	"unflip": "┬──┬◡ﾉ(° -°ﾉ)",
	"peak": "┬┴┬┴┤  (ಠ├┬┴┬┴",
	"sir": "( ಠ ͜ʖರೃ)",
}

function getEmoji(emojiName) {
	return emojis[emojiName] || undefined;
} 

module.exports = {
	getEmoji: getEmoji,
	all: emojis
}
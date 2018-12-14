/*
 * 创建一个包含所有卡片的数组
 */
let moves = 0;
let openCard1;
let openCard2;
let cardIcon1;
let cardIcon2;
let count = 0;

function restartGame() {
	window.location.reload();
}

function changeCard() {

	let cardsOptions = ['icon-magic', 'icon-camera', 'icon-food', 'icon-gift', 'icon-coffee', 'icon-key', 'icon-github', 'icon-google-plus'];
	cardsOptions = [...cardsOptions, ...cardsOptions];
	shuffle(cardsOptions);
	let allCards = document.querySelectorAll('.deck i');
	for (let item of allCards) {
		item.className = cardsOptions.shift();
	}
}

changeCard();
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

/*统计点击卡片的次数*/


/*合上卡片*/
function closeCard() {
	count = 0;
	if (cardIcon1 !== cardIcon2) {
		setTimeout(function () {
			openCard1.classList.remove('open');
			openCard2.classList.remove('show');
			openCard2.classList.remove('open');
			openCard1.classList.remove('show');
		}, 1500)
	}
}

/*let results = {
	ysplist: [{
			productCode: "001148016778",
			stlist: [
				{id: 17},
				{id: 18}
			]
		}]
}*/

function clickCard(event) {
	let target = event.target;
	if (count === 0) {
		openCard1 = target;
		cardIcon1 = openCard1.childNodes[1].className
	} else if (count === 1) {
		openCard2 = target;
		cardIcon2 = openCard2.childNodes[1].className
	}
	if (target.nodeName === 'LI' && target.classList.length === 1) {
		target.classList.add('open');
		target.classList.add('show');
		moves++;
		count += 1;
		document.querySelector('.moves').textContent = moves;
	}
	if (count === 2) {
		closeCard();
	}
}

let cards = document.querySelector('.deck');
cards.addEventListener('click', clickCard);


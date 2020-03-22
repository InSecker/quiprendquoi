const io = require('./socket.io');
const socket = io('http://' + window.location.hostname + ':3001');
const form = document.querySelector('.form.items');

const partyID = window.location.pathname.replace('/party/', '')

socket.on('response', (items) => {
	const $items = document.querySelectorAll('.item')
	for (let i = 0; i < items.length; i++) {
		let $itemButton = $items[i].querySelector('button')
		if($itemButton.classList.contains('pending')) {
			$itemButton.classList.remove('pending')
			$itemButton.parentNode.id = items[i]._id
			$itemButton.id = items[i]._id
		}
	}
})

socket.on('fetch', (items) => {
	let ids = []
	let serverIds = []
	let $items = document.querySelectorAll('.item')
	items.forEach(item => {
		serverIds.push(item._id)
	});
	$items.forEach($item => {
		ids.push($item.id)
		if (!serverIds.includes($item.id)) {
			$item.remove()
		}
	});
	items.forEach(item => {
		if (!ids.includes(item._id)) {
			addItemToList(item, item._id, false)
		}
	});
})

if (form) {
	form.webSocket = (id) => {
		if ( 'WebSocket' in window ) {
			const body = {
				name: document.getElementById('name').value,
				user: document.getElementById('author').value
			}
			document.getElementById('name').value = ""
			document.getElementById('author').value = ""
			socket.emit('addItem', {id, body})
			addItemToList(body, "", true);
			return false
		} else {
			console.warn('WebSocket not supported')
			return true
		}
	}
}

const addItemToList = function(body, itemID, pending) {
	const setClasses = pending ? "dynamic pending" : "dynamic"
	let $items = document.querySelector('.itemsContainer')
	$items.innerHTML += `
		<div class="item">
			<h4>Quoi?</h4>
			<p>${body.name}</p>
			<h4>Qui?</h4>
			<p>${body.user}</p>
			<button class="${setClasses}" id="${itemID}">Supprimer</button>
		</div>
	`
	addDeleteListener();
}

const addDeleteListener = function() {
	const buttons = document.querySelectorAll('.dynamic')
	buttons.forEach(button => {
		button.addEventListener('click', (e) => {
			if (!button.classList.contains('pending')) {
				e.target.parentNode.remove();
				const itemID = button.id
				socket.emit('deleteItem', {partyID, itemID})
			}
		})
	});
}

// REPLACE ALL DELETE FORMS BY BUTTON
if ('WebSocket' in window ) {
	let $deleteForms = document.querySelectorAll('.deleteContainer')
	$deleteForms.forEach($deleteForm => {
		const id = $deleteForm.querySelector('form').id
		$deleteForm.innerHTML = ""
		$deleteForm.parentNode.id = id
		$deleteForm.parentNode.innerHTML += `<button class="dynamic" id="${id}">Supprimer</button>`
	});
	addDeleteListener(window.location.pathname.replace('/party/', ''))
}

const searchBar = document.querySelector(".search-text");

const pseudoTags = [
	{"name": "Химия", "count":"16", "type": "subject"},
	{"name": "Физика","count":"7", "type": "subject"},
	{"name": "Программирование","count":"13", "type": "subject"},
	{"name": "Минина И. С.","count":"21", "type": "teacher"},
	{"name": "Менеджмент","count":"18", "type": "subject"},
];

function onSearch(){
	clearAutocomplete();

	const searchQuery = searchBar.value.toLowerCase();
	const filteredTags = [];

	if(searchQuery === "") return;

	pseudoTags.forEach((tag) =>{
		if(tag.name.substring(0,searchQuery.length).toLowerCase() === searchQuery)
			filteredTags.push(tag);
	});

	const limitCheck = document.querySelector("#autocompletion");
	if(limitCheck && limitCheck.childElementCount > 10) return; 		// if there is already 10 suggestions, do not offer more.

	createAutoComplete(filteredTags);
}

searchBar.addEventListener("input", onSearch);

function clearAutocomplete(){
	const oldAutocomplete = document.querySelector("#autocompletion");
	if(oldAutocomplete)
		oldAutocomplete.remove();
}

function onAutocompleteClick(eventInfo){
	eventInfo.preventDefault();									// prevent the default behavior of <button> inside <form>

	const autocompleteItem = eventInfo.target;
	searchBar.value = autocompleteItem.innerHTML;

	clearAutocomplete();
}

function createAutoComplete(list){
	const newUl = document.createElement("ul");
	newUl.className = "autocomplete-list";
	newUl.id = "autocompletion";

	list.forEach((tag) => {
		const newLi = document.createElement("li");
		const newBtn = document.createElement("button");

		newBtn.innerHTML = tag.name;
		newBtn.addEventListener("click",onAutocompleteClick);

		newLi.appendChild(newBtn);
		newUl.appendChild(newLi);
	});

	document.querySelector("#autocomplete-div").appendChild(newUl);
}


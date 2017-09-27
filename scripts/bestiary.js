var monsters;
var spaces;
var template = Handlebars.compile(document.querySelector('#template').innerHTML);
//Grab the CSV
var fileData = new XMLHttpRequest();
fileData.open("GET", './data/monsters.csv');
fileData.onreadystatechange = function () {
    if (fileData.readyState === 4) {
        if (fileData.status === 200 || fileData.status == 0) {
            // Create my Monsters
            monsters = d3.csvParse(fileData.responseText).map(function (item) {
                spaces = Object.keys(item);
                return Object.keys(item).reduce(function (objOut, key) {
                    objOut[key.replace(/ /g, '')] = item[key];
                    return objOut;
                }, {});
            })
            // Build initial page;
            makeUI(monsters);
        }
    }
}
fileData.send(null);


function makeUI(data) {
    console.log(data);
    document.querySelector('#mons').innerHTML = template(data);
}


function sort(option){
    switch (option){
        case 'cr':
            makeUI(monsters.sort(function(a,b){
                return a.CR - b.CR;
            }));
            break;
        case 'Creature':
            makeUI(monsters.sort(function(a,b){
                var nameA = a.Creature.toUpperCase();
                var nameB = b.Creature.toUpperCase();
                if(nameA < nameB){
                    return -1;
                }
                if (nameA > nameB){
                    return 1;
                }
                return 0;
            }));
            break;
    }
}

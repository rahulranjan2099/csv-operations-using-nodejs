
const searchInput = document.querySelector("[data-search]");

let myTable = document.getElementsByClassName('table')
let tr1 = myTable[0].getElementsByTagName('tr');
let tr2 = myTable[1].getElementsByTagName('tr');
let tr3 = myTable[2].getElementsByTagName('tr');

const searchRow = (tr,td,valueInput)=>{
    if(td){
        let textValue = td.textContent || td.innerHTML;
        
        if(textValue.toUpperCase().indexOf(valueInput)>-1){
            tr.style.display = "";
        }else{
            tr.style.display = "none";
        }
    }
}


const searchFunc = (tr,valueInput)=>{
    let td,td2,td3 = [];
    for(let i=0;i<tr.length;i++){
        td = tr[i].getElementsByTagName('td')[0];
        // td2 = tr[i].getElementsByTagName('td')[1];
        // td3 = tr[i].getElementsByTagName('td')[2];
    }
    for(let i=0;i<tr.length;i++){
    searchRow(tr[i],td,valueInput);
    
    // searchRow(tr[i],td2,valueInput);
    
    // searchRow(tr[i],td3,valueInput);
    }
}
const searchFunc2 = (tr,valueInput)=>{
    let td,td2,td3 = [];
    for(let i=0;i<tr.length;i++){
        td2 = tr[i].getElementsByTagName('td')[1];
    }
    for(let i=0;i<tr.length;i++){
    searchRow(tr[i],td2,valueInput);

    }
}
const searchFunc3 = (tr,valueInput)=>{
    let td,td2,td3 = [];
    for(let i=0;i<tr.length;i++){
        td3 = tr[i].getElementsByTagName('td')[2];
    }
    for(let i=0;i<tr.length;i++){ 
    searchRow(tr[i],td3,valueInput);
    }
}

searchInput.addEventListener("input",e=>{
    const valueInput = e.target.value.toUpperCase()
    searchFunc(tr1,valueInput)
    searchFunc2(tr2,valueInput)
    searchFunc3(tr3,valueInput)
})
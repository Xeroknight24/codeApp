fetchFunction = () => {
    let api_url = window.location.protocol + "//" + window.location.hostname + ":5000" + '/readCode';
    fetch(api_url)
        .then(resp => {
                let jsonData = resp.json();
                return jsonData;
        }).then( (obj) => {
            if (obj!=[]){
                let nameUser = document.getElementById('userName');
                let codeCopy = document.getElementById('copyCode');
                let getForm = document.getElementById('codeForm');
                nameUser.value = obj[0]["createdBy"];
                codeCopy.value = obj[0]["codeNumber"];
                getForm.action = '/delCode/'+obj[0]["id"];
                getForm.method = "GET";
                for(let i=0;i<obj.length;i++){
					if(document.getElementById('row'+i)==null) {
						let codeTable = document.getElementById('tableBody');
						new ClipboardJS('.btn'+i);
						let tableRow = document.createElement("TR");
						tableRow.id = 'row'+i;
						codeTable.appendChild(tableRow);
						let rowHead = document.createElement("TH");
						rowHead.scope = 'row'
						rowHead.textContent = i+1;
						tableRow.appendChild(rowHead);
						let rowDataName = document.createElement("TD");
						rowDataName.textContent = obj[i]["createdBy"];
						tableRow.appendChild(rowDataName);
						let rowDataCode = document.createElement("TD");
						codeInput = document.createElement("INPUT");
						codeInput.id = "codeInput"+i;
						codeInput.value = obj[i]["codeNumber"];
						codeInput.readOnly = true;
						rowDataCode.appendChild(codeInput);
						tableRow.appendChild(rowDataCode);
						let rowDataButton = document.createElement("TD");
						let delLink = document.createElement("A");
						delLink.href = '/delCode/'+obj[i]["id"]
						delLink.role="button";
						delLink.textContent ="حدف کد";
						delLink.className= 'btn btn-danger active';
						let cpyLink = document.createElement("BUTTON");
						cpyLink.textContent="کپی کد";
						cpyLink.className = 'btn btn-success .btn'+i;
						cpyLink.setAttribute('data-clipboard-target', "#codeInput"+i);
						rowDataButton.appendChild(cpyLink);
						rowDataButton.appendChild(delLink);
						tableRow.appendChild(rowDataButton);
						}	
					}
                }     
            })
        .catch(err => {
            console.log("Empty JSON")
        });
}
startLiveUpdate = () => {
    setInterval(fetchFunction, 3000);
}    
document.addEventListener('DOMContentLoaded', () => {
    new ClipboardJS('.btn');
	startLiveUpdate();
});


const inpu= document.querySelectorAll('.no');
const txt= document.querySelectorAll('.po');
const form= document.querySelectorAll('#form_id');
for(let i=0; i<inpu.length; i++){
            inpu[i].addEventListener('click',()=>{
                        form[i].action=`/update/${inpu[i].value}`;
                        if(txt[i].value=="" ||txt[i].value==null){
                            txt[i].value="Empty";
                        }      
                        input[i].value= txt[i].value;
                        form[i].submit(); 
            })         
     }   
    

const buttons= document.querySelectorAll('.more');
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
        let val= buttons[i];
        let old= $(`#${val.value}`).text();
        $(`#${val.value}`).html(`<strike>${old}</strike>`);
        

    })
}
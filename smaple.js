const arr = [1,2,3,4,5];

const List =({
    d: null,
    next: null
})
const head=null;
    

function createNode(arr){

    for(let i=0;i<arr.length;i++){
        const nn=List();
        nn.d=arr[i];
        nn.next=arr[i];
        head=nn;
    }
    
}
display();
createNode(arr);

function display (){
    while(head!=null){
        console.log(head.d);
        head=head.next;
    }
}

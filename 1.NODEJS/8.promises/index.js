function fetchData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
}

fetchData('data 1').then((data) => {
    console.log(data);
    fetchData('data 2').then((data)=>{
        console.log(data);
    })
})
.catch((err) => console.error(err));


function divide(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num2 == 0){
            reject("cannot divide with zero");
        }else{
            resolve(`result is ${num1/num2}`);
        }
    })
}
console.log(divide(10,20));
divide(10,5).then((data)=>console.log(data))
.catch(data=>console.log(data));

divide(10,0).then((data)=>console.log(data))
.catch(data=>console.log(data));
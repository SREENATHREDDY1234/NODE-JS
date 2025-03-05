function fetchData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
}

async function getData(){
    const data1 = await fetchData('data 1');
    console.log(data1);
    const data2 = await fetchData('data 2');
    console.log(data2);
}

getData();

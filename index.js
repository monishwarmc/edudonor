const ele = document.getElementById("root");

if(window.ethereum != undefined){
    ele.innerHTML(
        <div id="root"></div>
    );
}
else{
    ele.innerHTML(
        <h1>install metamask</h1>
    );
}
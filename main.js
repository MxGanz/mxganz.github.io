
let button1 = document.getElementsById("button1").addEventListener("click", clickButton())
let result = document.getElementByName("result")

function clickButton() {
    let x = document.getElementByName("input1")
    let y = document.getElementByName("input2")
    
    result.setText(x + y)
    
}
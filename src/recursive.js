function factorial(n){

  if (n > 0) {
    return (n * factorial(n-1));
  }else return 1;
}

function fibanochi(n){
  n -= 1;
  if (n >= 2)
  {
    return (fibanochi(n - 1) + fibanochi(n));
  }else if(n === 1){
    return 1;
  }else if (n === 0){
    return 0;
  }
}


function callFunctions(){
  for(var i=1; i < 15; i++){

  }

}
callFunctions();

function printmyreview(){

    var review = document.getElementById("myReview").value 
    var name = "-By ";
    name += document.getElementById("myName").value 

    

    document.getElementById("writeReview").innerHTML=review 
    document.getElementById("reviewrName").innerHTML=name 
  

}

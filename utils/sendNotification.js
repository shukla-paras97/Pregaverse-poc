var FCM = require('fcm-node');
var fcmToken = 'AAAAaweW79s:APA91bHgE5iar_bhk3mxjBOcrSuOkrEuYRR70GTM9p0yM2QJH9KHWQNEHut2c8LN4LTZErnlpZvDgzgjLyddIDwykjmPnBVt8K8iLvDvcjXo53oETst_1gwkDEqyKDLZs03lfQK1AF0g'; //put your server key here
var Firebase=new FCM(fcmToken);
exports.sendNotification = function(request, response){
    console.log("harii")
      var message = { 
        to:token,
        data:{
            name: "hari"
        }
      }
      Firebase.send(message, async function(err, response){
        if(err){
            console.log("Something has gone wrong!", err);
            return false;
        }else{
          return true;
        }
      })
    // }else{
    //   var message = { 
    //     to:token,
    //     notification:{
    //       body: 'Hari has assigned to you with due date'
    //     },
    //     data:{
    //         name:"hari"
    //       }
    //   }
    //   Firebase.send(message, async function(err, response){
    //     if(err){
    //         console.log("Something has gone wrong!", err);
    //         return false
    //     }else{
    //       console.log("Ios Successfully sent with response: ", response);
    //       return true;
    //     }
    //   });
    // }
  }



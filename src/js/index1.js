
registerServiceWorker() 
askPermission()
getNotificationPermissionState()
subscribeUserToPush()

function registerServiceWorker() {
    return navigator.serviceWorker.register('./sw.js')
    .then(function(registration) {
    console.log('Service worker successfully registered.');
    return registration;
    })
    .catch(function(err) {
    console.error('Unable to register service worker.', err);
    });
    }


    function askPermission() {
        return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
        });
        if (permissionResult) {
        permissionResult.then(resolve, reject);
        }
        })
        .then(function(permissionResult) {
        if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
        }
        });
        }

        
        function getNotificationPermissionState() {
            if (navigator.permissions) {
            return navigator.permissions.query({name: 'notifications'})
            .then((result) => {
                console.log(result.state)
            return result.state;
            });
            }
            return new Promise((resolve) => {
            resolve(Notification.permission);
            });
            }


            function subscribeUserToPush() {
                return registerServiceWorker()
                .then(function(registration) {
                const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                'BPZ7bJWuxPekyI4PUsYqnWHNSPCUjbQVwacEWh4EnGF4jhF68tSCKYPbwLPTC7s-XLChzvr6rKZ61i0m78BDqiY'
                )
                };
                return registration.pushManager.subscribe(subscribeOptions);
            })
            .then(function(pushSubscription) {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            const objeto_suscripcion = JSON.stringify(pushSubscription);
            sendSubscriptionToBackEnd(pushSubscription)
            return pushSubscription;
            });
            }


            function urlBase64ToUint8Array(base64String) { 
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
                } 
               


                function sendSubscriptionToBackEnd(subscription) {



                    var rawKey = subscription.getKey ? subscription.getKey('p256dh') : '';
                    var key = rawKey ? Base64EncodeUrl(btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey)))) : '';

                    var rawauth = subscription.getKey ? subscription.getKey('auth') : '';
                    var keyauth = rawauth ? Base64EncodeUrl(btoa(String.fromCharCode.apply(null, new Uint8Array(rawauth)))) : '';
                    
                    console.log(key)
                    
                    return fetch('http://christophersierrame.ddns.net/servidornotificaciones/guarda_suscripcion', {
                    method: 'POST',
                    headers: {"Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8' },
                    body: "endpoint="+subscription.endpoint+"&id="+localStorage.getItem("id")+"&auth="+keyauth+"&p256dh="+key
                    })
                    .then(function(response) {
                    if (!response.ok) {
                    throw new Error('Bad status code from server.');
                    }
                    return response.json();
                    })
                    .then(function(responseData) {
                    if (!(responseData.data && responseData.data.success)) {
                    throw new Error('Bad response from server.');
                    }
                    });
                    }
                    



                   
                    function Base64EncodeUrl(str){
                        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\+$/, '');
                    }
                    
                    function Base64DecodeUrl(str){
                        str = (str + '===').slice(0, str.length + (str.length % 4));
                        return str.replace(/-/g, '+').replace(/_/g, '/');
                    }
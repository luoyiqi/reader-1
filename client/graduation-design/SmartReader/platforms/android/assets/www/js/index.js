document.addEventListener("deviceready", function () {
    if (localStorage.getItem("news") == null) {
        localStorage.setItem("news", JSON.stringify([]));
        localStorage.setItem("current", "0");
        localStorage.setItem("volume", "50");
    }

    var takePhoto = document.getElementById("takePhoto");
    var browserNews = document.getElementById("browserNews");

    takePhoto.addEventListener("click", function () {
        //location.href = "speak.html";

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            localStorage.setItem("imgUrl", imageURI);
            location.href = "crop.html";
        }

        function onFail(error) {}
    }, false);

    browserNews.addEventListener("click", function () {
        location.href = "news.html";
    }, false);

    appAvailability.check(
        "com.iflytek.speechcloud",
        function() {
            //alert('Twitter is available');
        },
        function() {
            appAvailability.check(
                "com.iflytek.tts",
                function() {
                    //alert('Twitter is available');
                },
                function() {
                    //alert('Twitter is not available');
                    navigator.notification.confirm(
                        "检测到您尚未安装讯飞语音，是否马上安装？",
                        onConfirm,
                        "未安装讯飞语音",
                        ["取消", "安装"]
                    );

                    function onConfirm(buttonIndex) {
                        if (buttonIndex == 2) {
                            LocationAndSettings.switchToInstallTTS();
                        }
                    }
                }
            );
        }
    );
}, false);
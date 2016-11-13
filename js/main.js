'use strict'
$(document).ready(function () {

    say("Document ready");
    loadData();

    /*------------------------*/
    function say(message) {
        console.log(message);
    }
    function getPromise() {
        return new Promise(function(resolve, reject){
            $.getJSON('homeworks.json', resolve).fail(reject);
        });
    }
    function getHandler() {
        return function (data) {

            let works = data.works;
            works.forEach(function(value, index, arr){
                let element = generateElement(value);
                $('.all').append(element);
            });
        };
    }
    function loadData() {
        let promise = getPromise();
        promise.then(getHandler(), function (err) {
            say(err);
        });
    }
    function generateElement(obj) {
        var container = document.createElement('DIV');
        $(container).addClass('homework');

        var workname = document.createElement('h2');
        $(workname).addClass('homework-name');
        $(workname).html(obj.name);

        var p = document.createElement('p');

        var br = document.createElement('br');

        if(obj.src){
            var src = document.createElement('span');
            $(src).addClass('homework-src');
            $(src).html("SRC");

            var src_a = document.createElement('a');
            $(src_a).attr("href", obj.src);
            $(src_a).attr("target", '_blank');
            $(src_a).html("Link");

            $(p).append(br)
                .append(src)
                .append(src_a);
        }

        if(obj.dist){
            var dest = document.createElement('span');
            $(dest).addClass('homework-dist');
            $(dest).html("DIST");

            var dest_a = document.createElement('a');
            $(dest_a).attr("href", obj.dist);
            $(dest_a).attr("target", '_blank');
            $(dest_a).html("Link");
            $(p).append(br)
                .append(dest)
                .append(dest_a);
        }

        if(obj.img){
            var img = document.createElement('a');
            $(img).attr("href", obj.img);
            $(img).attr("target", '_blank');
            $(img).html("Screenshot");

            $(p).append(br)
                .append(img);
        }

        $(container).append(workname).append(p);

        return container;
    }
});
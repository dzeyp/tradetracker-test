var vueForm = new Vue({
    el: '#form',
    data: {
        url: 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10',
        buttonState: 'enabled'
    },
    methods: {
        processXml(element) {
            element.preventDefault();

            this.buttonState = 'inprogress';
            productGrid.gridData = [];
            xhr = new XMLHttpRequest();
            xhr.previousText = '';

            // this is called when output is detected from back-end stream
            xhr.onreadystatechange = function() {
                // if currently processing request
                if (xhr.readyState == 3) {
                    // get the new response by omitting the previous response
                    var newResponse = xhr.responseText.substring(xhr.previousText.length);

                    // since response text can contain multiple json (e.g. {json1: json1}{json2: json2}),
                    // replace the string in between multiple json for easy splitting below
                    newResponse = newResponse.replace(/}{/g, '}},{{');

                    newResponse.split('},{').forEach(function(product) {
                        var parsedProduct = JSON.parse(product);
                        
                        productGrid.gridData.push({
                            productid: parsedProduct.productid,
                            name: parsedProduct.name,
                            description: parsedProduct.description,
                            price: parsedProduct.price,
                            category: parsedProduct.categories,
                            producturl: parsedProduct.producturl,
                            imageurl: parsedProduct.imageurl
                        });
                    });
                                
                    xhr.previousText = xhr.responseText;
                }

                // if request process is done
                if (xhr.readyState == 4) {
                    if ( xhr.status != 200 ) {
                        productGrid.gridData = [];
                        vueForm.buttonState = 'enabled';

                        alert('[XHR] Fatal Error.');
                    }

                    var newResponse = xhr.responseText.substring(xhr.previousText.length);
                    newResponse = newResponse.replace(/}{/g, '}},{{');

                    newResponse.split('},{').forEach(function(product) {
                        var parsedProduct = JSON.parse(product);

                        productGrid.gridData.push({
                            productid: parsedProduct.productid,
                            name: parsedProduct.name,
                            description: parsedProduct.description,
                            price: parsedProduct.price,
                            category: parsedProduct.categories,
                            producturl: parsedProduct.producturl,
                            imageurl: parsedProduct.imageurl
                        });
                    });

                    vueForm.buttonState = 'enabled';
                }
            }

            xhr.open('POST', 'parse-xml-ajax', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('_token=' + csrfToken + '&url=' + encodeURIComponent(this.url));
        }
    },
    watch: {
        url: function (newUrl) {
            if (!newUrl) {
                this.url = 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=10';
            }
        }
    }
})

var productGrid = new Vue({
    el: '#productGrid',
    data: {
        searchQuery: '',
        gridColumns: ['productid', 'name', 'description', 'price', 'category', 'producturl', 'imageurl'],
        gridData: [],
        modalHeader: '',
        modalContent: '',
        showModal: false,
        rowLimit: 100
    },
    filters: {
        truncate: function(str, val = 500) {
            return str.substring(0, val) + '...';
        }
    },
    methods: {
        updateModal: function (key) {
            this.modalHeader = this.gridData[key].name;
            this.modalContent = this.gridData[key].description;
            this.showModal = true;
        }
    }
})

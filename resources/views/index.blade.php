<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>TradeTracker Test</title>

        <link rel="stylesheet" href="css/app.css">

        <script src="js/app.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form id="form" class="form-horizontal">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="url" class="col-sm-2 control-label">Enter URL</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-model="url">
                            </div>
                            <div class="col-sm-2">
                                <button class="btn btn-primary" v-if="buttonState == 'enabled'" v-on:click="processXml">Process XML</button>
                                <button class="btn btn-danger" disabled='disabled' v-if="buttonState == 'inprogress'">Processing...</button>
                            </div>
                        </div>
                    </form>
                    <div id="productGrid">
                        <table>
                            <thead>
                                <tr>
                                    <th v-for="key in gridColumns">
                                        @{{ key }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(entry, index) in gridData">
                                    <td v-for="key in gridColumns">
                                        <div v-if="key == 'imageurl'">
                                            <img v-bind:src="entry[key]">
                                        </div>
                                        <div v-else-if="key == 'producturl'">
                                            <a v-bind:href="entry[key]" target="_blank">Visit product page</a>
                                        </div>
                                        <div v-else-if="key == 'description'">
                                            <p v-if="entry[key].length > 500">
                                                @{{ entry[key] | truncate }}
                                                <a @click="updateModal(index)">read more</a>
                                            </p>
                                            <p v-else>
                                                @{{ entry[key] }}
                                            </p>
                                        </div>
                                        <div v-else>
                                            @{{ entry[key] }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <transition name="modal" v-if="showModal" @close="showModal = false">>
                            <div class="modal-mask">
                                <div class="modal-wrapper">
                                    <div class="modal-container">
                                        <div class="modal-header">
                                            <h3>@{{ modalHeader }}</h3>
                                        </div>
                                        <div class="modal-body">
                                            <p>@{{ modalContent }}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button class="modal-default-button" @click="showModal = false">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/vue.js"></script>
    </body>
</html>
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ProcessXmlNode;
use Hobnob\XmlStreamReader\Parser;
use SimpleXMLElement;

class MainController extends Controller
{
    /**
     * Homepage
     */
    public function index()
    {
        return view('index');
    }

    /**
     * AJAX call to process XML from the url through stream
     *
     * @param  Request
     */
    public function parseXmlAjax(Request $request)
    {
        $url = rawurldecode($request->input('url'));
        $xmlParser = new Parser();

        // flush php output for continuous stream of data
        set_time_limit(0);
        ob_implicit_flush(true);
        ob_end_flush();
        session_write_close();

        // package used to process XML data stream
        // https://github.com/hobnob/xmlStreamReader
        $xmlParser->registerCallback(
            '/products/product',
            function (Parser $parser, SimpleXMLElement $node) {
                $currency = $node->price->attributes();
                $categories = [];

                foreach ($node->categories->category as $category) {
                    array_push($categories, $category);
                }

                $categories = implode(', ', $categories);

                $data = [
                    'productid' => (string)$node->productid,
                    'name' => (string)$node->name,
                    'description' => (string)$node->description,
                    'price' => (string)$currency['currency'] . ' ' . $node->price,
                    'categories' => $categories,
                    'producturl' => (string)$node->producturl,
                    'imageurl' => (string)$node->imageurl
                ];

                echo json_encode($data);
            }
        );

        $xmlParser->parse(fopen($url, 'r'));
    }
}

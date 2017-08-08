<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ProcessXmlNode;
use Hobnob\XmlStreamReader\Parser;
use SimpleXMLElement;

class MainController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function parseXmlAjax(Request $request)
    {
        $url = rawurldecode($request->input('url'));
        $xmlParser = new Parser();

        set_time_limit(0);
        ob_implicit_flush(true);
        ob_end_flush();
        session_write_close();

        $xmlParser->registerCallback(
            '/products/product',
            function (Parser $parser, SimpleXMLElement $node) {
                $currency = $node->price->attributes();
                $categories = '';

                foreach ($node->categories->category as $category) {
                    $categories .= $category . ", ";
                }

                $data = [
                    'productid' => (string)$node->productid,
                    'name' => (string)$node->name,
                    'description' => (string)$node->description,
                    'price' => (string)$currency['currency'] . " " . $node->price,
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

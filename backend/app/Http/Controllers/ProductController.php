<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Auth()->user()->Products()->paginate(10);
        return ProductResource::collection($products);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->validated());
        $product->user_id = Auth()->id();
        $product->save();
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $keyword = $request->keyword;
        if ($request->filter) {
            $filter = $request->filter;
            $products =Product::where('user_id',Auth()->id())->where($filter, 'like',  $keyword . '%')->paginate(10);
        } else
            $products =Product::where('user_id',Auth()->id())->where('name', 'like',  $keyword . '%')->paginate(10);
        return ProductResource::collection($products);
    }
}

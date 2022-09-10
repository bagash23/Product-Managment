import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ApiProduct } from "../config/api";
import { Disclosure } from "@headlessui/react";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  console.log(filteredResults, "HAHAHAH");

  console.log(searchInput);

  useEffect(() => {
    ApiProduct.get("/product").then((res) => {
      setDataProduct(res.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = dataProduct.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(dataProduct);
    }
  };

  return (
    <div className="min-h-[1800px]">
      <section className="h-full max-h-[640px] mb-8 xl:mb-24">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
            <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
              <span className="text-violet-700">Supply</span> Makanan Kerumahmu
            </h1>
            <p className="max-w-[480px] mb-8">
              We really provide quality products and keep it clean hope it can
              help you in the distribution of food
            </p>
          </div>
          <div className="hidden flex-1 lg:flex justify-end items-end">
            <img src={require("../assets/supplies.png")} alt="" />
          </div>
        </div>
      </section>

      <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1  lg:bg-transparent lg:backdrop-blur rounded-lg mb-5">
        <input
          placeholder="Cari Produk"
          type={"text"}
          className="w-full px-6 py-3 "
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>

      <section className="mb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14">
            {searchInput.length > 1
              ? filteredResults.map((items, index) => {
                  return (
                    <>
                      <Link to={`/detil/${items.id}`} key={index}>
                        <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
                          <img className="mb-8" src={items.picture} alt="" />
                          <div className="mb-4 flex gap-x-2 text-sm">
                            <div className="bg-green-500 rounded-full text-white px-3 py-2 inline-block">
                              <h2>{items.name}</h2>
                            </div>
                            <div className="bg-violet-500 rounded-full text-white px-3 py-2 inline-block">
                              <h4>{items.expiredAt}</h4>
                            </div>
                          </div>
                          <div className="text-lg font-semibold max-w-[260px]">
                            <p>{items.isActive}</p>
                          </div>
                          <div className="text-lg font-semibold text-violet-600 mb-4">
                            $ {items.qty}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })
              : dataProduct.map((items, index) => {
                  return (
                    <>
                      <Link to={`/detil/${items.id}`} key={index}>
                        <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
                          <img className="mb-8" src={items.picture} alt="" />
                          <div className="mb-4 flex gap-x-2 text-sm">
                            <div className="bg-green-500 rounded-full text-white px-3 py-2 inline-block">
                              <h2>{items.name}</h2>
                            </div>
                            <div className="bg-violet-500 rounded-full text-white px-3 py-2 inline-block">
                              <h4>{items.expiredAt}</h4>
                            </div>
                          </div>
                          <div className="text-lg font-semibold max-w-[260px]">
                            <p>{items.isActive}</p>
                          </div>
                          <div className="text-lg font-semibold text-violet-600 mb-4">
                            $ {items.qty}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            {/* {dataProduct.map((items, index) => {
              return (
                <>
                  <Link to={`/detil/${items.id}`} key={index}>
                    <div className="bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
                      <img className="mb-8" src={items.picture} alt="" />
                      <div className="mb-4 flex gap-x-2 text-sm">
                        <div className="bg-green-500 rounded-full text-white px-3 py-2 inline-block">
                          <h2>{items.name}</h2>
                        </div>
                        <div className="bg-violet-500 rounded-full text-white px-3 py-2 inline-block">
                          <h4>{items.expiredAt}</h4>
                        </div>
                      </div>
                      <div className="text-lg font-semibold max-w-[260px]">
                        <p>{items.isActive}</p>
                      </div>
                      <div className="text-lg font-semibold text-violet-600 mb-4">
                        $ {items.qty}
                      </div>
                    </div>
                  </Link>
                </>
              );
            })} */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

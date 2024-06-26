'use client'

import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Divider, Image} from "@nextui-org/react";
import ProductCard from "@/components/ProductCard";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";
import useAuthStore from "@/lib/authStore";
import useUserStore from "@/lib/useUserStore";

export default function Home() {
  const [product, setProduct] = useState([])
  const [responseStatus, setResponseStatus] = useState([])
  const setUserProfile = useUserStore((state) => state.setUserProfile)

  const checkUserState = (async () => {
    let responseProfile = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-profiles/info`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Referer: "127.0.0.1:8000",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setResponseStatus(responseProfile.status)
    if (responseProfile.status === 200) {
      let dataProfile = await responseProfile.json();
      setUserProfile(dataProfile.data)
    }
  })

  useEffect(() => {

    if (responseStatus === 500) {
      redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`)
    }
  }, [responseStatus]);

  useEffect(() => {
    checkUserState()
  }, []);

  const fetchData = async () => {
    try {
      const responseProduct = await fetch("http://127.0.0.1:8000/api/products", {
        method: "GET",
        cache: "no-store",
        headers: {
          Referer: '127.0.0.1:8000',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
      });

      if (responseProduct.status === 401) {
        return redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
      }
      const dataProduct = await responseProduct.json();
      setProduct(dataProduct.data);
    } catch (err) {
      console.log(err);
    }
  }
  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    fetchData()
    console.log(accessToken)
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    }
  }, [])
  return (
    <>
      <div className="flex mt-4">
        <div className="w-max mx-auto rounded-xl overflow-hidden h-max">
          <Carousel width={850} autoPlay interval={3000} showStatus={false} infiniteLoop
                    showThumbs={false}>
            <div>
              <Image src={"banners/discount-banner.png"} className="bg-cover"/>
            </div>
            <div>
              <Image src={"banners/slide-banner.jpg"} className="bg-cover"/>
            </div>
            <div className="">
              <Image src={"banners/hero-page.png"} className="bg-cover"/>
            </div>
          </Carousel>
        </div>
      </div>
      <Divider className="my-8"/>
      <div className="xl:mt-14">
        <h1 className="text-left text-2xl font-semibold subpixel-antialiased pb-2">Explore Our Products</h1>
        <div className="grid xl:grid-cols-4 gap-3.5 mt-5 gap-y-8">
          {
            product.map((item, index) => {
              return (
                <ProductCard as
                             key={index} name={item.name} price={item.price} slug={item.slug}
                             imagePath={`storage/stores/${item.resources[0].image_path}`} storeSlug={item.store.slug}/>
              )
            })
          }
        </div>
      </div>
    </>
  )
    ;
}
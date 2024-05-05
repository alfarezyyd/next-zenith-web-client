import {Card, CardHeader, CardBody, Image, CardFooter, Button} from "@nextui-org/react";
import RatingStar from "./RatingStar.jsx";

export default function ProductCard() {
  return (
    <Card className="py-4 border-none">
      <CardHeader className="overflow-visible py-1">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            src="/images/hero-card-complete.jpeg"
            width={300}
          />
          <CardFooter
            className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Discount</p>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Product Name</p>
        <p className="text-sm text-red-500 mb-2 mt-2">Product Name</p>
        <RatingStar/>
      </CardBody>
    </Card>
);
}
import { Drawer } from "flowbite-react";
import React from "react";

export function DrawerComponent({ isOpen, onClose, selectedItems }) {
  const filteredItems = selectedItems.filter((item) => item.image && item.name);

  return (
    <Drawer open={isOpen} onClose={onClose} position="right">
      <Drawer.Header title="Selected Cryptocurrencies" />
      <Drawer.Items>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
          {filteredItems.map((crypto) => (
            <div
              key={crypto.id}
              className="text-center bg-black border rounded-md px-5 py-5"
            >
              <img
                src={crypto.image}
                alt={`${crypto.name} logo`}
                className="w-32 h-auto mx-auto"
              />
              <p className="mt-2">{crypto.name}</p>
              <p>${crypto.current_price.toFixed(2)}</p>
              <button className="bg-[#FF0000] px-5 py-2 rounded-md hover:bg-red-500">
                Remove
              </button>
            </div>
          ))}
        </div>
      </Drawer.Items>
    </Drawer>
  );
}


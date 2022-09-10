import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BuatProduct } from "../redux/action/Product";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataBaru, setDataBaru] = useState({
    name: "",
    qty: 0,
    isActive: true,
    expiredAt: "",
    picture: "",
  });

  const handleBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = () => {
    BuatProduct(dataBaru, handleClose);
  };

  return (
    <header className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h2 className="text-4xl lg:text-[20px] font-semibold">Food Court</h2>
        </Link>
        <div className="flex items-center gap-6">
          <Button variant="outline-primary" onClick={handleShow}>
            Buat Product
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buat Form Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-y-4">
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Name Produk"
              value={dataBaru.name}
              onChange={(e) =>
                setDataBaru({ ...dataBaru, name: e.target.value })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="number"
              placeholder="Qty Produk"
              value={dataBaru.qty}
              onChange={(qty) =>
                setDataBaru({ ...dataBaru, qty: qty.target.value })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Status Aktif Produk"
              value={dataBaru.isActive}
              onChange={(active) =>
                setDataBaru({
                  ...dataBaru,
                  isActive: active.target.value,
                })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="date"
              placeholder="expiredAt Produk"
              value={dataBaru.expiredAt}
              onChange={(date) =>
                setDataBaru({
                  ...dataBaru,
                  expiredAt: date.target.value,
                })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="file"
              placeholder="Picture Produk"
              onChange={async (e) => {
                try {
                  const res = await handleBase64(e.target.files[0]);
                  setDataBaru({
                    ...dataBaru,
                    picture: res,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Buat Product
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;

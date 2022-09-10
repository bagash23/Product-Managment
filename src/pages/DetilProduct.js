import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiProduct } from "../config/api";
import { Modal, Button } from "react-bootstrap";
import { updateProduct } from "../redux/action/Product";

const DetilProduct = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleHapus = () => setShow(true);
  const navigation = useNavigate();

  let { id } = useParams();
  id = parseInt(id);
  const [dataDetil, setDataDetil] = useState([]);

  const [dataUpdateForm, setDataUpdateForm] = useState({
    name: "",
    qty: 0,
    isActive: true,
    expiredAt: "",
    picture: "",
  });

  console.log(dataUpdateForm, "HAHAHA");

  useEffect(() => {
    ApiProduct.get(`/product/${id}`)
      .then((res) => {
        console.log(res.data);
        setDataUpdateForm({
          ...dataUpdateForm,
          name: res.data.name,
          qty: res.data.qty,
          isActive: res.data.isActive,
          expiredAt: res.data.expiredAt,
          picture: res.data.picture,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelet = (id) => {
    ApiProduct.delete(`/product/${id}`)
      .then((res) => {
        console.log(res.data);
        navigation("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = () => {
    updateProduct(dataUpdateForm, id, navigation);
  };

  const handleBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="container mx-auto min-h-[800px] mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{dataUpdateForm.name}</h2>
          <h3 className="text-lg mb-4">{dataUpdateForm.expiredAt}</h3>
        </div>
        <div className="text-3xl font-semibold text-violet-600">
          $ {dataUpdateForm.qty}
        </div>
      </div>
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        <div className="max-w-[768px]">
          <div className="mb-8">
            <img src={dataUpdateForm.picture} alt="" className="w-full" />
          </div>
        </div>
        <div className="flex-1 w-full mb-8 bg-white border border-gray-300 px-6 py-8">
          <div className="text-3xl font-semibold text-violet-600 mb-3">
            Update Produk {dataUpdateForm.name}
          </div>
          <hr />
          <p className="text-lg mb-4 mt-2">
            Kamu dapat merubah data dan juga bisa menghapus data jika sudah
            terhapus maka data tidak bisa kembali
          </p>
          <form className="flex flex-col gap-y-4">
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Name Produk"
              value={dataUpdateForm.name}
              onChange={(e) =>
                setDataUpdateForm({ ...dataUpdateForm, name: e.target.value })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="number"
              placeholder="Qty Produk"
              value={dataUpdateForm.qty}
              onChange={(qty) =>
                setDataUpdateForm({ ...dataUpdateForm, qty: qty.target.value })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="text"
              placeholder="Status Aktif Produk"
              value={dataUpdateForm.isActive}
              onChange={(active) =>
                setDataUpdateForm({
                  ...dataUpdateForm,
                  isActive: active.target.value,
                })
              }
            />
            <input
              className="border border-gray-300 focus:border-violet-700 rounded w-full px-4 h-14 text-sm outline-none"
              type="date"
              placeholder="expiredAt Produk"
              value={dataUpdateForm.expiredAt}
              onChange={(date) =>
                setDataUpdateForm({
                  ...dataUpdateForm,
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
                  setDataUpdateForm({
                    ...dataUpdateForm,
                    picture: res,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            />
            <div className="flex gap-x-2">
              <Button variant="outline-primary" onClick={update}>
                Update Data
              </Button>
              <Button variant="outline-danger" onClick={handleHapus}>
                Hapus Data
              </Button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pemberitahuan Sekali lagi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin ingin menghapus data : {dataUpdateForm.name} jika
          anda mengklik hapus maka data tidak bisa dikembalikan kembali
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="outline-primary" onClick={() => handleDelet(id)}>
            Hapus Sekarang
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetilProduct;

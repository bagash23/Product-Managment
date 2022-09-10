import { ApiProduct } from "../../config/api";

export const BuatProduct = async (data, handleClose) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      name: data.name,
      qty: data.qty,
      expiredAt: data.expiredAt,
      isActive: data.isActive,
      picture: data.picture,
    };

    ApiProduct.post("/product", body, config).then((res) => {
      console.log(res.data);
      handleClose();
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (data, id, navgation) => {
  try {
    const body = {
      name: data.name,
      qty: data.qty,
      expiredAt: data.expiredAt,
      isActive: data.isActive,
      picture: data.picture,
    };
    console.log(body);

    ApiProduct.put(`/product/${id}`, body, {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
      navgation("/");
    });
  } catch (error) {
    console.log(error, "API WKWKWK");
  }
};

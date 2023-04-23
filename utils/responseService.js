exports.response = (res, code, responseMessage, responseData) => {
    return res
      .status(code)
      .json({ message: responseMessage, data: responseData });
  };
  
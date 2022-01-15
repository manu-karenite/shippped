import React, { useState } from "react";
import { auth } from "../../firebase.js";
import SidebarUser from "../../components/Navigation/SidebarUser.js";
import { Button } from "antd";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(0);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // get the user from fb
    try {
      setLoading(1);
      const userCurrent = auth.currentUser;
      const updatedResponse = await userCurrent.updatePassword(password);
      toast.success("Password Has Been Set Succesfully!");
      setLoading(0);
    } catch (error) {
      setLoading(0);
      toast.error(error.message);
    }
  };
  const passwordUpdateForm = () => {
    return (
      <form>
        <label htmlFor="uP" className="mt-2 mb-2">
          Choose New Password
        </label>
        <input
          id="uP"
          type="text"
          className="form-control"
          autoFocus={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="6 or more Characters"
        />
        <Button
          type="primary"
          size="large"
          block
          shape="round"
          className="mt-4"
          disabled={!password || password.length < 6 || loading}
          onClick={onSubmitHandler}
        >
          {loading ? (
            <LoadingOutlined
              spin
              className="justify-content-center text-primary"
            />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SidebarUser />
        </div>
        <div className="col-md-6 pt-4">
          <h4>Update Password</h4>
          <hr />
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdate;

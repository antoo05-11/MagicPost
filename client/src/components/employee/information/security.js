export default function Security() {
    return (
        <div className="formContainer">
            <form>
                <div className="row">
                    <h3>Thay đổi mật khẩu</h3>
                </div>

                <div className="row mt-2">
                    <div className="col-md-6">
                        <label htmlFor="newPassword">Mật khẩu mới</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Mật khẩu mới"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Xác nhận mật khẩu mới"
                        />
                    </div>

                    <div className="mt-3 btnContainer">
                        <button type="button" className="btn btnCreate">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

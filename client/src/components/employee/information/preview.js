export default function Preview() {
    return (
        <div className="formContainer">
            <div className="row d-flex justify-content-center align-items-center">
                <img alt="avatar" src="/avatar.png" className="w-75 rounded-circle" />
            </div>
            <div className="row d-flex justify-content-center align-items-center mt-3">
                Chức vụ: Trưởng điểm
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                Địa điêm công tác: ABC, ABC, ACB
            </div>

            <div className="row d-flex justify-content-center align-items-center mt-3">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Thao tác</th>
                            <th scope="col">Thời gian</th>
                            <th scope="col">Đối tượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>

                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>

                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>
    );
}
export const AddJob = () => {
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Job Title</label>
          <input className="form-control" placeholder="Enter Job Title" />
        </div>

        <div className="form-group">
          <label>Hourly Rate</label>
          <input type="number" className="form-control" placeholder="Hourly Rate" />
        </div>

        <div className="form-group">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <button
          type="button"
          style={{ marginTop: "10px" }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export const AddJob = () => {
  return (
    <div className="container">
      <form>
        <div class="form-group">
          <label>Job Title</label>
          <input class="form-control" placeholder="Enter Job Title" />
        </div>

        <div class="form-group">
          <label>Hourly Rate</label>
          <input type="number" class="form-control" placeholder="Hourly Rate" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <button
          type="button"
          style={{ marginTop: "10px" }}
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

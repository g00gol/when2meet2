export default function CreateEvent() {
  return <div>
    <h1>When2Meet2</h1>
    <h2>Beta</h2>
    <form>
      <label>
        Event Name
        <input type="text" />
      </label>
      <label>
        Event Type
        <select>
          <option value="daysofweek">Days of the Week</option>
          <option value="calendar">Calendar</option>
        </select>
      </label>
      <button type="submit">Create</button>
    </form>
  </div>;
}

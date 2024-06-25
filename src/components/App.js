import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // state to store our notes
  const [notes, setNotes] = useState(null); // notes is the current value of notes, setNotes is a function that will update the value of notes

  // state to hold the values of inputs
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  // useeffect for displaying the notes array after fetching from backend response
  useEffect(() => {
    // anything you put in here will run when the app starts
    fetchNotes(); // this will run the fetchNotes function & fetch the notes array from backend as our response (in network tab from developer tools)
  }, []); // we leave the array empty since we need it to run only once when the app starts up.

  // Functions
  // function that fetches our notes
  const fetchNotes = async () => {
    // Fetch the notes
    const responseFromBackend = await axios.get(
      "http://localhost:8080/get-all-notes"
    ); // the function is not running yet. we want the function to run as soon as the app starts up, so we do that in a useEffect (react hook).

    // Set it on state (update the value of notes)
    setNotes(responseFromBackend.data.notes); // setNotes will update the value of notes from null to the current array of notes
    // console.log(responseFromBackend);
    // console.log(responseFromBackend.data.notes);
  };

  // function to update createForm field

  // we need to get the name of the input field while typing(changing using onChange) & we need to get the new value. so we get both of those of the default html event that gets passed here (we put an e for the event)
  const updateCreateFormField = (e) => {
    // console.log("hey");

    // const { name, value } = e.target;
    const target = e.target; // We first access the target property of the event object e, which represents the element that triggered the event.
    const name = target.name; // Next, we extract the name and value properties from the target object and assign them to variables.
    const value = target.value;
    // const triggeredHtmlElement = e.target;
    // const nameAttributeOfTheTriggeredElement = triggeredHtmlElement.name;
    // const valueAttributeOfTheTriggeredElement = triggeredHtmlElement.value;

    // now we update the state
    setCreateForm({
      ...createForm, // creates a duplicate of the createForm object
      // name: value, // this will update the key of name, but we don't need the key of name, we need whatever the variable is equal to
      [name]: value, // this will find the keys (name attributes) and update its values (value attributes) to whatever is changed by the JS event.
    });

    // console.log({ name, value });
  };

  // Function to create the note
  const createNote = async (e) => {
    e.preventDefault(); // prevents the page from reloading when the form is submitted

    // Create the note
    const responseFromBackend = await axios.post(
      // the 2 arguments are: the link to post the values, the values to be sent for post method
      "http://localhost:8080/create-note",
      createForm
    );

    // Update state
    setNotes([...notes, responseFromBackend.data.note]); // adds our newly created note to the array of notes. The variable note was created in out backend for response
    // console.log("submit");
    // console.log(responseFromBackend);

    // Clear form state
    setCreateForm({
      title: "",
      body: "",
    });
  };

  // Function to delete a note
  const deleteNote = async (idOfTheNoteToBeDeleted) => {
    // the argument should be equal to the id of the note we're deleting
    // Deiete the note
    const responseFromBackend = await axios.delete(
      `http://localhost:8080/delete-note/${idOfTheNoteToBeDeleted}`
    );
    console.log(responseFromBackend);

    // Update state
    // we heve to filter out the one we deleted
    const newNotes = [...notes].filter((note) => {
      return note._id !== idOfTheNoteToBeDeleted; // return notes where note._id is not equal to the id we passed in (idOfTheNoteToBeDeleted). This will return an array of notes that meet this condition.
    });

    setNotes(newNotes); // assigns newNotes as the new value of the notes state variable.
  };

  const handleUpdateFieldChange = (e) => {
    // const { value, name } = e.target;
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (noteToBeDisplayedBeforeUpdating) => {
    // this function should preload the state with the values of the note we're editing
    // Get the current note
    // console.log(note);
    // Set state on update form
    setUpdateForm({
      title: noteToBeDisplayedBeforeUpdating.title,
      body: noteToBeDisplayedBeforeUpdating.body,
      _id: noteToBeDisplayedBeforeUpdating._id,
    });
  };

  // function to update note
  const updateNote = async (e) => {
    e.preventDefault();
    // const { title, body } = updateForm;
    // Longer version of above line
    const newUpdatedNoteTitle = updateForm.title;
    const newUpdatedNoteBody = updateForm.body;
    // Even longer version
    // const updateFormTitle = updateForm.title;
    // const updateFormBody = updateForm.body;
    // const title = updateFormTitle;
    // const body = updateFormBody;

    // Send the update request
    const responseFromBackend = await axios.put(
      `http://localhost:8080/update-note/${updateForm._id}`,
      {
        title: newUpdatedNoteTitle,
        body: newUpdatedNoteBody,
      }
    );

    // console.log(responseFromBackend);

    // Update state
    // creating a duplicate of the notes
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id; // finds the index of the note which is updated (note whose id was in the button). We find the index so that we can update the note at that index
    });

    newNotes[noteIndex] = responseFromBackend.data.note; // The note at that particular index is now equal to the response we got from updating the note

    setNotes(newNotes); // Set the notes array to our updated array

    // Clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  return (
    <div className="App">
      {/* Displaying all the notes */}
      <div className="">
        <h2>Notes:</h2>
        {/* rendering an array of notes. It starts as null, so we gotta check if notes exist before we render. */}
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                {/* <button onClick={deleteNote(note._id)}>Delete note</button>  */}
                {/* the above line of code would run instantly, so we use the below line of code so that it doesn't run ultil we click it. If clicked, it will run the function & pass the note._id to it */}
                <button onClick={() => deleteNote(note._id)}>
                  Delete note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
              </div>
            );
          })}
      </div>

      <br />

      {/* Form for updating a note */}

      {/* if updateForm._id exists (if it's not null), render the update note form */}
      {updateForm._id && (
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              type="text"
              name="title"
            />
            <br />
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
              id=""></textarea>
            <br />
            <button type="submit">Update note</button>
          </form>
        </div>
      )}

      <br />

      {/* Form for creating a note */}

      {/* if updateForm._id doesn't exist (if it's null), render the create note form */}
      {!updateForm._id && (
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input
              onChange={updateCreateFormField} // when the user types, the function will run to update the value
              value={createForm.title} // the value will depend on whether the createForm value is changed or not
              type="text"
              name="title"
            />
            <br />
            <textarea
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
              id=""></textarea>
            <br />
            <button type="submit">Create note</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

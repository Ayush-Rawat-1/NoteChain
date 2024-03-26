import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper{
  public type Note = {
    title : Text;
    content : Text;
  };
  var notes : List.List<Note> = List.nil<Note>();
  
  public func createNote(titleNote: Text,contentNote: Text){
    let newNote: Note = {
      title = titleNote;
      content = contentNote;
    };
    notes := List.push(newNote,notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes() : async [Note]{
    return List.toArray(notes);
  };

  public func removeNote(titleNote: Text,contentNote: Text){
    let newNote: Note = {
      title = titleNote;
      content = contentNote;
    };
    notes := List.filter<Note>(notes,func n{n!=newNote});
    Debug.print(debug_show(notes));
  };
};

const QuestionCreate = () => {
    return ( 
        <div className="flex-container">
            {/* Inside a question there exist
                    -A Text Property to store question
                    -A Options Property to store object id of options
                    -A Correct Option Property to store single object id of correct option
                    -A Category id to which the question will be grouped as
             */}
            <h2>Create A Question</h2>
            <form className="create" onSubmit={handleSubmit}>
                <label htmlFor="">Question: </label>
                <input type="text" />
                <label htmlFor="">Options: </label>
                <input type="text" />
                <label htmlFor="">Correct Option: </label>
                <input type="text" />
                <label htmlFor="">Category: </label>
                <input type="text" />
                <button>Create</button>
            </form>
        </div>
     );
}
 
export default QuestionCreate;
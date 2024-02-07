function RightSidebar(){
    
    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3> 
                {/*  text-light changes the color of text right side bar */}
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Users</h3> 
                {/*  text-light changes the color of text right side bar */}
            </div>
        </section>
    )
}

export default RightSidebar;
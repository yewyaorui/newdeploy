import './Menu.css'

function Menu({ active, setActive, setCategory }) {
    const links = [
        { id: 1, name: "General", value: "general" },
        { id: 2, name: "Pet Healthcare", value: "pet healthcare" },
        { id: 3, name: "Pet Leisure", value: "pet leisure" },
        { id: 4, name: "Pet Entertainment", value: "pet entertainment" },
        { id: 5, name: "Pet Adoption", value: "pet adoption" },
        { id: 6, name: "Pet Technology", value: "pet technology" },
    ];
    function onClick(id, value) {
        setActive(id)
        setCategory(value)
    }

    return (
        <nav className='newsmenu'>
            <ul>
                {links.map(link => (
                    <li
                        key={link.id}
                        className={active === link.id ? "active" : "inactive"}
                        onClick={() => onClick(link.id, link.value)}


                    >
                        {link.name}

                    </li>

                ))}
            </ul>

        </nav>
    )

}

export default Menu
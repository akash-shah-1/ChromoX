import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Category = () => {
  const subCategories = [
    { name: "Abstract", href: "#" },
    { name: "Landscape", href: "#" },
    { name: "Portrait", href: "#" },
    { name: "Still Life", href: "#" },
    { name: "Modern", href: "#" },
    { name: "Contemporary", href: "#" },
  ];

  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "abstract", label: "Abstract", checked: false },
        { value: "landscape", label: "Landscape", checked: false },
        { value: "portrait", label: "Portrait", checked: false },
        { value: "still-life", label: "Still Life", checked: false },
      ],
    },
    {
      id: "medium",
      name: "Medium",
      options: [
        { value: "acrylic", label: "Acrylic", checked: false },
        { value: "oil", label: "Oil", checked: false },
        { value: "watercolor", label: "Watercolor", checked: false },
        { value: "pastel", label: "Pastel", checked: false },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "small", label: "Small (8x10 inches)", checked: false },
        { value: "medium", label: "Medium (16x20 inches)", checked: false },
        { value: "large", label: "Large (24x36 inches)", checked: false },
        { value: "custom", label: "Custom Size", checked: false },
      ],
    },
    {
      id: "price",
      name: "Price",
      options: [
        { value: "under-50", label: "Under $50", checked: false },
        { value: "50-100", label: "$50 - $100", checked: false },
        { value: "100-200", label: "$100 - $200", checked: false },
        { value: "200-500", label: "$200 - $500", checked: false },
        { value: "over-500", label: "Over $500", checked: false },
      ],
    },
    {
      id: "color",
      name: "Color",
      options: [
        { value: "blue", label: "Blue", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "red", label: "Red", checked: false },
        { value: "yellow", label: "Yellow", checked: false },
        { value: "black-white", label: "Black & White", checked: false },
      ],
    },
    {
      id: "style",
      name: "Style",
      options: [
        { value: "abstract", label: "Abstract", checked: false },
        { value: "impressionism", label: "Impressionism", checked: false },
        { value: "realism", label: "Realism", checked: false },
        { value: "modern", label: "Modern", checked: false },
      ],
    },
    {
      id: "subject",
      name: "Subject",
      options: [
        { value: "nature", label: "Nature", checked: false },
        { value: "cityscapes", label: "Cityscapes", checked: false },
        { value: "portraits", label: "Portraits", checked: false },
        { value: "animals", label: "Animals", checked: false },
      ],
    },
  ];

  const categery = useLocation();
  const getcatgery = categery.pathname.split("/")[2];
  console.log("My Categery = > ", getcatgery);

  const [filter,setfilter] = useState({});

  const HandleFilter = (e) => {
    const {name, value} = e.target;
    setfilter({
      ...filter,
      [name] : value
    })
    console.log("Filter =>", filter)

};


    // Use useEffect to observe changes in filter state
    useEffect(() => {
      // Perform actions based on updated filter state
      console.log("Filter updated:", filter);
      // Any other actions...
    }, [filter]); // Dependency array ensures this effect runs when filter state changes
  

  return (
    <>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        <ul
          role="list"
          className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
        >
          {subCategories.map((category) => (
            <li key={category.name}>
              <a href={category.href}>{category.name}</a>
            </li>
          ))}
        </ul>

        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}`}
                          onChange={(e) => HandleFilter(e)}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
};

export default Category;

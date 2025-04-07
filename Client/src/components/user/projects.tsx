import React from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Modal_right_side from '../../assets/user/modal_right.avif'

const dummyProjects = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `project ${i + 1}`,
  description: "Looking for skilled freelancers to design a modern Figma UI.",
  price: 999,
  rating: 4.5,
  image: Modal_right_side,
}));

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen p-6 bg-white">
      <aside className="w-1/5 pr-4">
        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="mb-4 text-xl font-semibold">Filter</h2>

          <div className="mb-4">
            <label className="text-sm font-medium">Search</label>
            <Input placeholder="Search projects..." className="mt-1" />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex flex-col gap-1 mt-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <label key={star} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="flex items-center gap-1 text-sm">
                    {Array(star)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Sort By</label>
            <select className="w-full px-3 py-2 mt-1 border rounded">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>

          <Button className="w-full mt-4">Apply Filters</Button>
        </div>
      </aside>

      <main className="w-4/5">
        <h1 className="mb-6 text-3xl font-bold">Projects</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dummyProjects.map((project) => (
            <Card key={project.id} className="transition shadow-md rounded-2xl hover:shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-40 rounded-t-2xl"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                <p className="mb-2 text-sm text-gray-500 truncate">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-600">₹{project.price}</span>
                  <span className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    {project.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

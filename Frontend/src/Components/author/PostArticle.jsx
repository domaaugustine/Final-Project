
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { UserAuthorContextObj } from "../../Contexts/UserAuthorContext";

function PostArticle() {
  const { currentUser } = useContext(UserAuthorContextObj);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function postArticle(articleObj) {
    try {
      console.log("Current User:", currentUser);

      let currentDate = new Date();
      let formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`;

      const articleData = {
        ...articleObj,
        authorData: {
          nameOfAuthor: currentUser?.firstName || "Unknown",
          email: currentUser?.email || "No email",
          profileImageUrl: currentUser?.profileImageUrl || "",
        },
        articleId: Date.now(),
        dateOfCreation: formattedDate,
        dateOfModification: formattedDate,
        comments: [],
        isArticleActive: true,
      };

      console.log("Submitting:", articleData);

      const res = await axios.post(
        "http://localhost:3000/author-api/article",
        articleData
      );

      if (res.status === 201) {
        navigate(`/author-profile/${currentUser.email}/articles`); 
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error posting article:", error.response?.data || error);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title border-bottom">
              <h2 className="p-3" style={{ color: "black" }}>
                Write an Article
              </h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit(postArticle)}>
                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label text-start">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <p className="text-danger">*{errors.title.message}</p>
                  )}
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    {...register("category", { required: "Category is required" })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      --Select Category--
                    </option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                  {errors.category && (
                    <p className="text-danger">*{errors.category.message}</p>
                  )}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="10"
                    {...register("content", { required: "Content is required" })}
                  ></textarea>
                  {errors.content && (
                    <p className="text-danger">*{errors.content.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-end">
                  <button type="submit" className="add-article-btn btn btn-outline-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;

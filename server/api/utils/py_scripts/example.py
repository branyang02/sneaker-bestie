import sys

def recommend_movie(movie_name):
    # Here would be your recommendation logic
    # For simplicity, let's just return a static recommendation
    if movie_name == "Interstellar":
        return "You might also like: Inception, The Martian, Gravity"
    else:
        return "No recommendations found"

if __name__ == "__main__":
    movie_name = sys.argv[1]  # Get the input parameter from the command line
    recommendation = recommend_movie(movie_name)
    print(recommendation)

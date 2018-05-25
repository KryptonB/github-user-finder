$(document).ready(function(){
	$('#userName').on('keyup', function(){
		let username = $('#userName').val();

		// Call the API using AJAX
		$.ajax({
			url: 'https://api.github.com/users/' + username,
			data: {
				client_id: 'a0183c2610c4c216ab85',
				client_secret: 'd7c003d240757439e0b45f07ac5dfb032826ad41'
			},
			success: function(user){

				$.ajax({
					url: 'https://api.github.com/users/' + username + '/repos',
					data: {
						client_id: 'a0183c2610c4c216ab85',
						client_secret: 'd7c003d240757439e0b45f07ac5dfb032826ad41',
						sort: 'created: asc'
					},
					success: function(repos){
						$('#repos').empty();
						$.each(repos, function(index, repo){
							$('#repos').append(`
								<div class="card">
								  <div class="card-header"><strong>${repo.name}</strong></div>
								   <div class="card-body">
									<div class="row">
										<div class="col-md-7">
											${repo.description}
										</div>
										<div class="col-md-3">
											<span class="badge badge-primary">Forks: ${repo.forks_count}</span>
											<span class="badge badge-warning">Watchers: ${repo.watchers_count}</span>
											<span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
										</div>
										<div class="col-md-2">
											<a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
										</div>
									</div>
								  </div>
								</div>
								<br>
							`);
						});
					}
				});


				$('#profile').html(`
					<div class="card">
					  <div class="card-header"><strong>${user.name}</strong></div>
					   <div class="card-body">
						<div class="row">
							<div class="col-md-3">
								<img class="thumbnail avatar" src="${user.avatar_url}"> <br><br>
								<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}"> View Profile </a>
							</div>
							<div class="col-md-9">
								<span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
								<span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
								<span class="badge badge-success">Followers: ${user.followers}</span>
								<span class="badge badge-danger">Following: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
									<li class="list-group-item"><strong>Website/Blog:</strong> ${user.blog}</li>
									<li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
									<li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
								</ul>
							</div>
						</div>
					  </div>
					</div>
				`);
			}
		});

	});
});

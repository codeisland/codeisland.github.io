require 'curb'
require 'json'

module GithubOrgMembers
  class Generator < Jekyll::Generator
    safe false

    def generate(site)
      members = get_members_data site.config['github_organization']

      template_input = File.read(File.join(site.source, '_plugins', 'github_org_members.liquid'))
      template = Liquid::Template.parse(template_input)

      File.open(File.join(site.source, '_includes', 'github_org_members.html'), 'w') do |f|
        f.write template.render('members' => members)
      end
    end

    private

    def get_members_data(github_organization)
      url = "https://api.github.com/orgs/#{github_organization}/public_members"
      r = Curl::Easy.perform(url) do |curl|
        curl.headers["User-Agent"] = "curl"
      end

      JSON.parse r.body
    end

  end
end

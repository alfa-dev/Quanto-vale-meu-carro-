require 'sinatra'
require 'pathname'
require 'slim'
require 'sass'

class SassHandler < Sinatra::Base
  get '/css/*.css' do
    filename = params[:splat].first
    scss filename.to_sym
  end

  set :views, 'app/stylesheets/sass'
end

use SassHandler

set :root do
  Pathname.new File.realpath(File.join(File.dirname(__FILE__), '..')) << '/app'
end

set :public_folder, 'public'

get '/' do
  erb :index, :layout => :layout
end